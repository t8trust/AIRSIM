import { PartialType } from '@nestjs/swagger';
import { CreateVolDto } from './create-vol-dto'

export class UpdateVolDto extends PartialType(CreateVolDto) {}
