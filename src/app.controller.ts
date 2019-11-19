import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

@Controller()
@ApiUseTags('Greeting')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ title: 'Greetings' })
  getHello(): string {
    return this.appService.getHello();
  }
}
