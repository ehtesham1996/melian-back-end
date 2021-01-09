import { Injectable } from '@nestjs/common';
import { CreateNetworkInput } from './dto/create-network.input';
import { UpdateNetworkInput } from './dto/update-network.input';

@Injectable()
export class NetworkService {
  create(createNetworkInput: CreateNetworkInput) {
    return 'This action adds a new network';
  }

  findAll() {
    return `This action returns all network`;
  }

  findOne(id: number) {
    return `This action returns a #${id} network`;
  }

  update(id: number, updateNetworkInput: UpdateNetworkInput) {
    return `This action updates a #${id} network`;
  }

  remove(id: number) {
    return `This action removes a #${id} network`;
  }
}
