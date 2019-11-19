import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import {
  ApiUseTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@Controller('cats')
@ApiUseTags('Cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('/byId/:id')
  @ApiOkResponse({
    description: 'Cat with the provided id.',
  })
  @ApiBadRequestResponse({
    description: 'No such cat.',
  })
  @ApiOperation({ title: 'Get a cat by his id' })
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.catsService.findById(id);
  }

  @Get('/byName/:name')
  @ApiOkResponse({
    description: 'Cat with the provided name.',
  })
  @ApiBadRequestResponse({
    description: 'No such cat.',
  })
  @ApiOperation({ title: 'Get a cat by his name' })
  async findByName(@Param('name') name: string) {
    return await this.catsService.findByName(name);
  }

  @Post()
  @ApiOperation({ title: 'Add a cat' })
  @ApiOkResponse({
    description: 'Created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Wrong parameters, please match the DTO.',
  })
  @UsePipes(ValidationPipe)
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    return { error: false };
  }

  @Get()
  @ApiOperation({ title: 'Get all cats' })
  @ApiOkResponse({
    description: 'List of all cats.',
  })
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
