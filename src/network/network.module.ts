import { Module } from '@nestjs/common';
import { NetworkService } from './network.service';
import { NetworkResolver } from './network.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Network, NetworkSchema } from './entities/network.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Network.name, schema: NetworkSchema }
    ])
  ],
  providers: [NetworkResolver, NetworkService],
  exports: [NetworkService]
})
export class NetworkModule {}
