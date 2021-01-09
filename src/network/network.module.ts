import { Module } from '@nestjs/common';
import { NetworkService } from './network.service';
import { NetworkResolver } from './network.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Network, NetworkSchema } from './model/network.model';
import { UserModule } from '../user/user.module';
import { NotificationModule } from '@src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Network.name, schema: NetworkSchema }
    ]),
    UserModule,
    NotificationModule
  ],
  providers: [NetworkResolver, NetworkService],
  exports: [NetworkService]
})
export class NetworkModule {}
