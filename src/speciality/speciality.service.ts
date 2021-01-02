import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSpecialityInput } from './dto/create-speciality.input';
import { UpdateSpecialityInput } from './dto/update-speciality.input';
import { Speciality } from './entities/speciality.entity';

@Injectable()
export class SpecialityService {

  constructor(
    @InjectModel(Speciality.name) private specialityModel,
  ) {}

  async create(createSpecialityInput: CreateSpecialityInput) {
    const speciality = await this.specialityModel.create({
      ...createSpecialityInput
    });
    return speciality
  }

  findAll() {
    return `This action returns all speciality`;
  }

  findOne(id: number) {
    return `This action returns a #${id} speciality`;
  }

  update(id: number, updateSpecialityInput: UpdateSpecialityInput) {
    return `This action updates a #${id} speciality`;
  }

  remove(id: number) {
    return `This action removes a #${id} speciality`;
  }
}
