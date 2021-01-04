import { Module } from '@nestjs/common';
import { SendMobileNotificationService } from './send-mobile-notification/send-mobile-notification.service';

@Module({
  providers: [
    SendMobileNotificationService
  ],
  exports: [
    SendMobileNotificationService
  ]
})
export class NotificationModule {}
