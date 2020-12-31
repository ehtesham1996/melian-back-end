import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel(createUserInput);
    await createdUser.save();
    createdUser.professionalAccountExist = createdUser.professional ? true : false;
    return createdUser;
  }

  async login(LoginInput: LoginInput) {
    try {
    const user = this.userModel.find({ phone: LoginInput.phone });
    if (user) {
      console.log(user)
    } else {
      console.log("user not found");
    }
    } catch (error) {
      console.log(error);
    }
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: Types.ObjectId) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: Types.ObjectId, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: Types.ObjectId) {
  //   return `This action removes a #${id} user`;
  // }
}
