import { Controller, Get, Logger, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { Mail, Prisma } from '@prisma/client';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  private readonly logger = new Logger(MailController.name);

  @Get('get')
  async getMail(
    @Query('idUser') idUser: Prisma.MailWhereInput,
  ): Promise<Mail[] | null> {
    return await this.mailService.getMailByIdUser(idUser);
  }

  @MessagePattern('register')
  async readRegisterPayment(@Payload() data, @Ctx() context: RmqContext) {
    try {
      this.logger.log(`data: ${JSON.stringify(data)}`);

      const channel = context.getChannelRef();
      const originalMesage = context.getMessage();

      channel.ack(originalMesage);
      return data;
    } catch (ex) {
      console.log(ex);
    }
  }

  @MessagePattern('confirmation')
  async readConfimationPayment(@Payload() data, @Ctx() context: RmqContext) {
    try {
      this.logger.log(`data: ${JSON.stringify(data)}`);
      const channel = context.getChannelRef();
      const originalMesage = context.getMessage();

      channel.ack(originalMesage);
      return data;
    } catch (ex) {
      console.log(ex);
    }
  }
}
