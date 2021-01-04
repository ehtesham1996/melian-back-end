import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateHobbyInput } from './dto/create-hobby.input';
import { UpdateHobbyInput } from './dto/update-hobby.input';
import { Hobby, HobbyDocument } from './hobby.model';
@Injectable()
export class HobbyService {
  constructor(
    @InjectModel(Hobby.name) private hobbyModel: Model<HobbyDocument>,
  ) {}

  create(payload: CreateHobbyInput) {
    const createdHobby = new this.hobbyModel(payload);
    return createdHobby.save();
  }

  findAll() {
    return `This action returns all hobby`;
  }

  findOne(id: Types.ObjectId) {
    return `This action returns a #${id} hobby`;
  }

  update(id: Types.ObjectId, updateHobbyInput: UpdateHobbyInput) {
    return `This action updates a #${id} hobby`;
  }

  remove(id: Types.ObjectId) {
    return `This action removes a #${id} hobby`;
  }
}
