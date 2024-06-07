import { ModuleRef } from '@nestjs/core'
import { Connection } from '../connection/connection'
import { MailService } from '../mail/mail.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MemberService {
  constructor (private moduleRef: ModuleRef) {}

  getConnectionName(): string {
    const connection = this.moduleRef.get(Connection)
    return connection.getName()
  }

  sendEmail() {
    const mailService = this.moduleRef.get(MailService)
    mailService.send()
  }
}