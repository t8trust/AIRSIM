import { PartialType } from '@nestjs/swagger';
import { CreateAeroportDto } from './create-aeroport-dto'

export class UpdateAeroportDto extends PartialType(CreateAeroportDto) {}
