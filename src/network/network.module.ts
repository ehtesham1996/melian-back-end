import { Module } from '@nestjs/common';
import { NetworkService } from './network.service';
import { NetworkResolver } from './network.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Network, NetworkSchema } from './model/network.model';
import { UserModule } from '../user/user.module';
import { NotificationModule } from '../notification/notification.module';
import { User, UserSchema } from '../user/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Network.name, schema: NetworkSchema },
      { name: User.name , schema: UserSchema}
    ]),
    UserModule,
    NotificationModule
  ],
  providers: [NetworkResolver, NetworkService],
  exports: [NetworkService]
})
export class NetworkModule {}
