import { Controller, Get, Post, Query, Param, Header, HttpCode, HttpRedirectResponse, Redirect } from '@nestjs/common'
// import { Request, Response } from 'express'

@Controller('/api/users')
export class UserController {
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
