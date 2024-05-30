import { Controller, Get, Post, Query, Param } from '@nestjs/common'
// import { Request } from 'express'

@Controller('/api/users')
export class UserController {
  @Get('/sample')
  get(): string {
    return 'GET'
  }

  @Get('/hello')
  sayHello(
    @Query('firstname') firstName:string,
    @Query('lastname') lastName: string
  ): string {
    return `Hello ${firstName} ${lastName}`
  }

  // @Get('/:id')
  // getById(@Req() request: Request): string {
  //   return `GET ${request.params.id}`
  // }

  @Get('/:id')
  getById(@Param('id') id: string): string {
    return `GET ${id}`
  }

  @Post()
  post(): string {
    return 'POST'
  }
}
