import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Vendease endpoint',
    description: 'Vendease home',
    tags: ['Home'],
  })
  @ApiOkResponse({
    type: Object,
    status: 200,
    description: 'Welcome to Vendease Movie backend service',
  })
  getHello(@Res() res: Response): Response {
    return res.status(200).json({ message: 'Welcome to Vendease' });
  }
}
