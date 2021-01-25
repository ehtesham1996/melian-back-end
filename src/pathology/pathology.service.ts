import { Injectable } from '@nestjs/common';
import { CreatePathologyInput } from './dto/create-pathology.input';
import { UpdatePathologyInput } from './dto/update-pathology.input';

@Injectable()
export class PathologyService {
  create(createPathologyInput: CreatePathologyInput) {
    return 'This action adds a new pathology';
  }

  findAll() {
    return `This action returns all pathology`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pathology`;
  }

  update(id: number, updatePathologyInput: UpdatePathologyInput) {
    return `This action updates a #${id} pathology`;
  }

  remove(id: number) {
    return `This action removes a #${id} pathology`;
  }
}
