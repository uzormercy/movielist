import { ApiProperty } from '@nestjs/swagger';
import { ICharacter } from './character.interface';
import { IResponseDto } from 'src/shared/types';

export class CharacterResponseDto implements IResponseDto<ICharacter> {
  @ApiProperty({
    type: String,
    description: 'Message from api',
    example: 'Character retrieved successfully',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'Data from api',
    example: {
      firstName: 'John',
      lastName: 'Doe',
      location: {
        name: 'Port harcourt',
        latitude: '63723',
        longitude: '93934',
      },
    },
  })
  data: ICharacter;
}
