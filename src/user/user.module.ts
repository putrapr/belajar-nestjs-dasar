import { Module } from '@nestjs/common'
import { UserController } from './user/user.controller'
import { UserService } from './user/user.service'
import { Connection } from './connection/connection'

@Module({
  controllers: [UserController],
  providers: [UserService, Connection]
})
export class UserModule {}
