export type TCharacterStatus = 'active' | 'dead' | 'unknown';
export type TCharacterGender = 'male' | 'female';

export interface ICharacter {
  id: string;
  firstname: string;
  lastname: string;
  gender: TCharacterGender;
  status: TCharacterStatus;
  stateOfOrigin?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ILocation {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt?: string;
}
