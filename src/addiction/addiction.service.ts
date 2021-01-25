import { Injectable } from '@nestjs/common';
import { CreateAddictionInput } from './dto/create-addiction.input';
import { UpdateAddictionInput } from './dto/update-addiction.input';

@Injectable()
export class AddictionService {
  create(createAddictionInput: CreateAddictionInput) {
    return 'This action adds a new addiction';
  }

  findAll() {
    return `This action returns all addiction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addiction`;
  }

  update(id: number, updateAddictionInput: UpdateAddictionInput) {
    return `This action updates a #${id} addiction`;
  }

  remove(id: number) {
    return `This action removes a #${id} addiction`;
  }
}
