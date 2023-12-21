import { Controller, Get, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { Mail, Prisma } from '@prisma/client';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('getMail')
  async getMail(
    @Query('idUser') idUser: Prisma.MailWhereInput,
  ): Promise<Mail[] | null> {
    return await this.mailService.getMailByIdUser(idUser);
  }
}
