import { Controller, Get, Post, Req, Res, Query, Param, Header, HttpCode, HttpRedirectResponse, Redirect, Inject } from '@nestjs/common'
import { Request, Response } from 'express'
import { UserService } from './user.service'
import { Connection } from '../connection/connection'
import { MailService } from '../mail/mail.service'
import { UserRepository } from '../user-repository/user-repository'

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: MailService,
    @Inject('EmailService') private emailService: MailService,
    private userRepository: UserRepository
  ) {}
  
  @Get('/connection')
  async getConnection(): Promise<string> {
    this.userRepository.save()
    this.mailService.send()
    this.emailService.send()
    return this.connection.getName()
  }

  // @Inject()
  // @Optional() -- when added, when the service is not used, there is no error
  // private userService: UserService

  @Get('/hello')
  async sayHello(@Query('name') name: string): Promise<string> {
    return this.service.sayHello(name)
  }

  // @Get('/hello')
  // async sayHello(
  //   @Query('firstname') firstName:string,
  //   @Query('lastname') lastName: string
  // ): Promise<string> {
  //   return `Hello ${firstName} ${lastName}`
  // }

  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'Template Engine',
      name
    })
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name)
    response.status(200).send('Success Set Cookie')
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request): string {
    return request.cookies['name']
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return { data: 'Hello JSON'}
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-response',
      statusCode: 301
    }
  }

  // @Get('/sample-response')
  // sampleResponse(@Res() response: Response) {
  //   response.status(200).json({
  //     data: 'Hello World Sample'
  //   })
  // }

  @Get('/sample')
  get(): string {
    return 'GET'
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
