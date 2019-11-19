import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsInt()
  @ApiModelProperty()
  readonly age: number;

  @IsString()
  @ApiModelProperty()
  readonly breed: string;
}
