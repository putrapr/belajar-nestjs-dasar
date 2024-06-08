import { Controller, Get, Post, Req, Res, Query, Param, Header, HttpCode, HttpRedirectResponse, Redirect, Inject, UseFilters, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'
import { UserService } from './user.service'
import { Connection } from '../connection/connection'
import { MailService } from '../mail/mail.service'
import { UserRepository } from '../user-repository/user-repository'
import { MemberService } from '../member/member.service'
import { User } from '@prisma/client'
import { ValidationFilter } from 'src/validation/validation.filter'

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: MailService,
    @Inject('EmailService') private emailService: MailService,
    private userRepository: UserRepository,
    private memberService: MemberService
  ) {}

  @Get('/create')
  async create(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string
  ): Promise<User> {
    if (!firstName) {
      throw new HttpException(
        {
          code: 400,
          errors: 'first_name is required'
        },
        400
      )
    }
    return this.userRepository.save(firstName, lastName)
  }
  
  @Get('/connection')
  async getConnection(): Promise<string> {
    this.mailService.send()
    this.emailService.send()
    console.info(this.memberService.getConnectionName())
    this.memberService.sendEmail()
    return this.connection.getName()
  }

  // @Inject()
  // @Optional() -- when added, when the service is not used, there is no error
  // private userService: UserService

  @Get('/hello')
  @UseFilters(ValidationFilter)
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
