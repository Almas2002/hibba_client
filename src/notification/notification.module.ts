import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NotificationService } from './service/notification.service';
import { ChatGateway } from './chat.gateway';
import { NotificationGatewayService } from './service/notification-gateway.service';
import { NotificationController } from './notification.controller';
import { SocketModule } from '../socket/socket.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), SocketModule,ChatModule],
  controllers: [NotificationController],
  providers: [NotificationService, ChatGateway, NotificationGatewayService],
  exports: [NotificationGatewayService],
})
export class NotificationModule {
}