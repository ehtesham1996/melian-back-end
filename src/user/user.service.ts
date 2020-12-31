import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput, LoginOutput } from './dto/login-user.input';
import { User, UserDocument } from './models/user.model';
import { sign } from 'jsonwebtoken'
import { AuthenticationError, UserInputError } from 'apollo-server-express';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async create(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel(createUserInput);
    await createdUser.save();
    createdUser.professionalAccountExist = createdUser.professional ? true : false;
    return createdUser;
  }

  async login(LoginInput: LoginInput): Promise<LoginOutput> {
    console.log(LoginInput)
    const user = await this.userModel.findOne({ phone: LoginInput.phone }).exec();
    if (!user) throw new HttpException('Invalid phone or password', HttpStatus.UNAUTHORIZED);

    const isVerified = user.verifyPasswordSync(LoginInput.password);
    if (!isVerified) throw new HttpException('Invalid phone or password', HttpStatus.UNAUTHORIZED);

    const token = this.createToken(user);
    return {
      success: true,
      token
    }


  }

  createToken({ _id }: UserDocument) {
      return sign({ _id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' }) // change secret according to env
  }

  async findById(id: Types.ObjectId) {
    const user = await this.userModel.findById(id);
    user.professionalAccountExist = user.professional ? true : false;
    return user;
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // update(id: Types.ObjectId, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: Types.ObjectId) {
  //   return `This action removes a #${id} user`;
  // }
}
