import { PartialType } from '@nestjs/mapped-types';
import { CreateReverseDto } from './create-reverse.dto';

export class UpdateReverseDto extends PartialType(CreateReverseDto) {}
