import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
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

  async findAll() {
    return await this.specialityModel.find();
  }

  async findOne(id: string) {
    return await this.specialityModel.findOne({ _id: Types.ObjectId(id) });
  }

  // update(id: number, updateSpecialityInput: UpdateSpecialityInput) {
  //   return `This action updates a #${id} speciality`;
  // }

  async remove(id: string) {
    const speciality = await this.specialityModel.findOne({ _id: Types.ObjectId(id) });
    await this.specialityModel.remove({ _id: id });
    return speciality;
  }
}
