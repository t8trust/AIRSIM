import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('avions')
export class AvionsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all planes';
  }
}