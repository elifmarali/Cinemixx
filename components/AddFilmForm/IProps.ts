export interface ILanguage {
  name: string;
  shortening: string;
}

export interface IInitialValues {
  id: null | number;
  adult: boolean;
  genres_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: null | number;
  release_date: null | Date;
  title: string;
  video: boolean;
  vote: null | number;
  file: null | File;
}
