import { Injectable } from '@nestjs/common';
import { Mail, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MailService {
  constructor(private prisma: PrismaService) {}

  async getMailByIdUser(where: Prisma.MailWhereInput): Promise<Mail[] | null> {
    return await this.prisma.mail.findMany({ where });
  }
}
