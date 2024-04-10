export interface IEpisode {
  id: string;
  name: string;
  releaseDate: string;
  code: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TEpisodeRequest = {
  page: number;
  limit: number;
};

export interface IEpisodeCharacter {
  id: string;
  characterId: string;
  episodeId: string;
}
