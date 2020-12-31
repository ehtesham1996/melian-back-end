import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel(createUserInput);
    console.log(createdUser)
    return await createdUser.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: Types.ObjectId) {
    return `This action returns a #${id} user`;
  }

  update(id: Types.ObjectId, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: Types.ObjectId) {
    return `This action removes a #${id} user`;
  }
}
