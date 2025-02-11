export interface IBanner {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [number];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote: number;
  vote_average: number;
  vote_count: number;
  file: null | string;
}


export interface IBannerParams{
  contentType:boolean;
  random:boolean;
  param?:string | number;
}