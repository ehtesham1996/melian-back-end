import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateNetworkInput } from './dto/create-network.input';
import { Network, NetworkDocument } from './model/network.model';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/models/user.model';
import { Model, Types } from 'mongoose';
import { NotificationService } from '../notification/notification.service';
import { InvitationsFilter } from './dto/invitation-filter.dto';
import { INVITATION_TYPE } from './types/invitaions-type.enum';
import { ROLE } from '../user/types/user.role.enum';
import { ResponseTemplate } from '../core/dto/response-template.dto';
// import { UpdateNetworkInput } from './dto/update-network.input';

@Injectable()
export class NetworkService {

  constructor(
    @InjectModel(Network.name) private networkModel: Model<NetworkDocument>,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService
  ) { }

  async sendInvite(sendingUser: User, createNetworkInput: CreateNetworkInput): Promise<Network> {

    const users = await this.userService.find({
      $or: [{ phone: createNetworkInput.phone }, { email: createNetworkInput.email }]
    });

    console.log('users are', users);

    const alreadySent = await this.findOne({
      sender: sendingUser._id,
      $or: [
        {
          receiverPhone: createNetworkInput.phone
        },
        {
          receiverEmail: createNetworkInput.email
        }
      ]
    }).count();
    console.log(alreadySent);
    if (alreadySent) throw new HttpException(
      'Your invitation to this user is already pending',
      HttpStatus.CONFLICT
    );
    // Now We have here 4 case

    // User is trying to send invitation to himself
    if (sendingUser.userRole === createNetworkInput.accountType
      && (sendingUser.phone === createNetworkInput.phone || sendingUser.email === createNetworkInput.email)
    ) {
      throw new HttpException(
        'You cannot send invitation to your self',
        HttpStatus.BAD_REQUEST
      );
    }

    // two receiver account exists against phone and email
    if (users.length >= 2) {
      throw new HttpException(
        'Phone and Email belongs to multiple accounts.Please rewrite the invitation information',
        HttpStatus.BAD_REQUEST
      );
    }

    // one receiver account exists against phone and email
    if (users.length == 1) {
      const user = users[0];
      createNetworkInput.phone = user.phone;
      createNetworkInput.email = user.email;
      return await this.create({
        ...createNetworkInput,
        sender: sendingUser._id,
        senderAccountType: sendingUser.userRole
      });
    }

    // none receiver account exists against phone and email
    const message = `You've been invited by ${sendingUser.firstName + ' ' + sendingUser.lastName} to create account on Melian App`;
    if (sendingUser.otp !== 123456) {
      this.notificationService.sendSMSToMobile(createNetworkInput.phone, message);
    }
    return await this.create({
      ...createNetworkInput,
      sender: sendingUser._id,
      senderAccountType: sendingUser.userRole
    });

  }

  async create(
    networkInput: CreateNetworkInput & { sender: string, senderAccountType: ROLE }
  ): Promise<Network> {
    const networkModel = new this.networkModel({
      sender: networkInput.sender,
      receiverEmail: networkInput.email,
      receiverPhone: networkInput.phone,
      receiverFirstName: networkInput.firstName,
      receiverLastName: networkInput.lastName,
      receiverAccountType: networkInput.accountType,
      senderAccountType: networkInput.senderAccountType
    });

    await networkModel.save();
    return networkModel;
  }


  async filterInvitations(user: User, filter: InvitationsFilter): Promise<Network[]> {

    if (filter.invitationType === INVITATION_TYPE.received) {

      const query: any = {
        receiverAccountType: user.userRole,
        $or: [{ receiverPhone: user.phone }]
      };
      if (user.email) query.$or.push({ receiverEmail: user.email });
      const invitations = await this.find(query) || [];
      return invitations;

    } else if (filter.invitationType === INVITATION_TYPE.sent) {

      const query: any = { sender: user._id, senderAccountType: user.userRole };
      const invitations = await this.find(query) || [];
      return invitations

    } else return [];
  }

  async deleteInvitation(user: User, networkId: string): Promise<Network> {

    if (!Types.ObjectId.isValid(networkId)) {
      throw new HttpException('Invalid network id given', HttpStatus.BAD_REQUEST);
    }

    const network = await this.delete({
      _id: networkId,
      sender: user._id
    })
    if (!network) throw new HttpException('Unable to delete', HttpStatus.BAD_REQUEST);

    return network;
  }
  find(query) {
    return this.networkModel.find(query);
  }

  findOne(query) {
    return this.networkModel.findOne(query);
  }

  // update(id: number, updateNetworkInput: UpdateNetworkInput) {
  //   return `This action updates a #${id} network`;
  // }

  delete(query) {
    return this.networkModel.findOneAndDelete(query);
  }
  remove(id: number) {
    return `This action removes a #${id} network`;
  }
}
