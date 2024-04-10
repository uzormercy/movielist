export enum ECharacterStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  UNKNOWN = 'UNKNOWN',
}

export enum ECharacterGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface ICharacter {
  id: string;
  firstName: string;
  lastName: string;
  gender: ECharacterGender;
  status: ECharacterStatus;
  stateOfOrigin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ILocation {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TCharacterRequestWithFiltersAndSort = {
  page: number;
  limit: number;
  sort?: string;
  filter?: string;
};
