import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login-user.input';
import { User, UserDocument } from './models/user.model';
import { sign } from 'jsonwebtoken'
import { SignedUrlResponse } from './types/signed-url-response.type';
import { S3 } from 'aws-sdk';
import { ResponseTemplate, ResponseTokenTemplate } from './dto/response-template.response';
import { SendMobileNotificationService } from 'src/notification/send-mobile-notification/send-mobile-notification.service';
import { WorkPlaces } from './models/workplaces.model';
import { Professional } from './models/professional.model';
import { ProfessionalInput } from './dto/professional.input';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private notification: SendMobileNotificationService
  ) { }

  async create(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel(createUserInput);
    await createdUser.save();
    const token = this.createTokenForOTP(createdUser);
    return {
      message: "New user successfully created",
      success: true,
      token
    };
  }

  async login(LoginInput: LoginInput): Promise<ResponseTokenTemplate> {
    const user = await this.userModel.findOne({ phone: LoginInput.phone }).exec();
    if (!user) throw new HttpException('Invalid phone or password', HttpStatus.UNAUTHORIZED);

    const isVerified = user.verifyPasswordSync(LoginInput.password);
    if (!isVerified) throw new HttpException('Invalid phone or password', HttpStatus.UNAUTHORIZED);

    const token = await this.createTokenForOTP(user);
    return {
      success: true,
      message: "success",
      token
    }
  }

  createToken({ _id }: User) {
    return sign({ _id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' }) // change secret according to env
  }

  async createTokenForOTP(user: UserDocument) {
    user.otp = 123456 || Math.floor(100000 + Math.random() * 900000);
    user.otpExpiry = Math.floor(Date.now() + 60000);
    user.save();

    if (user.otp !== 123456) {
      const message = `Your Otp for melian app is ${user.otp}, it is valid only for 1 minute`;
      await this.notification.sendSMSToMobile(user.phone, message);
    }

    return sign({ _id: user._id }, process.env.JWT_SECRET_FOR_OTP || 'secret123', { expiresIn: '3m' }) // change secret according to env
  }

  createTokenForEmailResent({ _id }: User) {
    return sign({ _id }, process.env.JWT_SECRET_FOR_EMAIL || 'secretEMAIL', { expiresIn: '1d' }) // change secret according to env
  }

  async resendOTP(user: User) {
    const { otpExpiry } = user;
    if (otpExpiry > Date.now()) {
      return {
        success: false,
        message: `Unable to send OTP, please try again after ${Math.floor((otpExpiry - Date.now()) / 1000)} seconds.`
      }
    }

    user.otp = 123456 || Math.floor(100000 + Math.random() * 900000);
    user.otpExpiry = Math.floor(Date.now() + 60000);
    await user.save();

    if (user.otp !== 123456) {
      const message = `Your Otp for melian app is ${user.otp}, it is valid only for 1 minute`;
      await this.notification.sendSMSToMobile(user.phone, message);
    }
    return {
      success: true,
      message: "OTP sent successfully"
    }
  }

  async sendPasswordResetLink(email: string) {
    const user = await this.userModel.findOne({ email });
    const { _id } = user;
    if (!email) {
      throw new HttpException('Invalid request, email is required', HttpStatus.BAD_REQUEST);
    }
    const token = this.createTokenForEmailResent(_id);

    const message = `
        <h3>Dear Melian Customer</h3>
        We have received a request to authorize this email address for use with Melian application. If you requested this verification, please go to the following URL to confirm that you are authorized to use this email address: <br />
        <a class="ulink" href=http://localhost:3000/user/resetPassword/${token} target="_blank" /><br />
        Your request will not be processed unless you confirm the address using this URL. This link expires 24 hours after your original verification request.
    `;
    console.log(message)
    // await this.notification.sendEmail([email], message);
    return {
      success: true,
      message: "verification link successfull sent to email address"
    }
  }

  async passwordReset(user: User, password: string): Promise<ResponseTemplate> {
    if (!password) {
      throw new HttpException('Invalid request, password field is required', HttpStatus.BAD_REQUEST);
    }

    user.password = password;
    await user.save();
    return {
      success: true,
      message: "success"
    }
  }

  async verifyOTP(user: User, code: number) {
    const { otp, otpExpiry } = user;
    if (code !== otp) {
      throw new HttpException('OTP not matched', HttpStatus.BAD_REQUEST);
    }
    if (otpExpiry < Date.now()) {
      throw new HttpException('OTP expired, please get OTP again from login', HttpStatus.BAD_REQUEST);
    }

    user.otp = user.otpExpiry = undefined;
    user.isPhoneVerified = true;

    await user.save();

    const token = await this.createToken(user);
    return {
      success: true,
      message: "success",
      token
    }
  }

  async findById(id: Types.ObjectId) {
    const user = await this.userModel.findById(id);
    user.professionalAccountExist = user.professional ? true : false;
    return user;
  }

  async getProfileImageUploadUrl(filename: string, filetype: string): Promise<SignedUrlResponse> {
    const s3 = new S3({
      signatureVersion: 'v4',
      region: process.env.AWS_REGION || 'eu-west-2',
    });

    const s3Params = {
      Bucket: process.env.S3_BUCKET,
      Key: filename,
      Expires: 60,
      ContentType: filetype,
      ACL: 'public-read'
    };

    const signedRequest = await s3.getSignedUrl('putObject', s3Params);
    const url = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;

    return {
      signedRequest,
      url
    };
  }

  async addWorkplace(user: User, workplace: WorkPlaces): Promise<WorkPlaces> {
    const { name, address, zipCode, country, city } = workplace;
    if (!name || !address || !zipCode || !country || !city) {
      const error = `Invalid input: ${!name ? 'name, ' : ''}${!address ? 'address, ' : ''}${!zipCode ? 'zipCode, ' : ''}${!country ? 'country, ' : ''}${!city ? 'city, ' : ''}is missing from request body`;
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    user.professional = user.professional || {} as Professional;
    user.professional.workplaces ? user.professional.workplaces.push(workplace) : user.professional = { workplaces: [workplace] };
    await user.save();
    return workplace;
  }

  async updateWorkplace(user, workplace): Promise<WorkPlaces> {
    const { _id, name, address, zipCode, country, city } = workplace;
    if (!name || !address || !zipCode || !country || !city) {
      const error = `Invalid input: ${!_id ? '_id, ' : ''}${!name ? 'name, ' : ''}${!address ? 'address, ' : ''}${!zipCode ? 'zipCode, ' : ''}${!country ? 'country, ' : ''}${!city ? 'city, ' : ''}is missing from request body`;
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    let workplaceIndex = user.professional.workplaces.findIndex(workplace => workplace._id.toString() === _id);
    if (workplaceIndex < 0) {
      throw new HttpException(`Invalid input, ID:${_id} is not valid`, HttpStatus.BAD_REQUEST);
    }
    user.professional.workplaces[workplaceIndex] = workplace;
    await user.save();
    return workplace;
  }

  async removeWorkplace(workplaceId, user): Promise<ResponseTemplate> {
    if (!workplaceId) {
      const error = `Invalid input: workplaceId is requried`;
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    let workplaceIndex = user.professional.workplaces.findIndex(workplace => workplace._id.toString() === workplaceId);
    if (workplaceIndex < 0) {
      throw new HttpException(`Invalid input, ID:${workplaceId} is not valid`, HttpStatus.BAD_REQUEST);
    }

    user.professional.workplaces[workplaceId];
    user.professional.workplaces.splice(workplaceIndex, 1);
    await user.save();
    return {
      success: true,
      message: "Wokrplace deleted successfully"
    };
  }

  async addProfessionalDetail(professional: ProfessionalInput, user: User): Promise<Professional> {
    const { credentialType, credential, specialities } = professional;

    user.professional = user.professional || {} as Professional;

    if (!credential || !credentialType) {
      const error = `Invalid input: ${!credential ? 'credential, ' : ''}${!credentialType ? 'credentialType, ' : ''}is missing from request body`;
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    if (credential) user.professional.credential = credential;
    if (credentialType) user.professional.credentialType = credentialType;

    if (specialities && specialities.length > 0) {
      user.professional.specialities ? user.professional.specialities.push(...specialities) : user.professional.specialities = specialities;
    }
    await user.save();
    return user.professional;
  }
}
