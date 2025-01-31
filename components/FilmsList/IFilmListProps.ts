import { Dayjs } from "dayjs";

export interface ISingleList {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Dayjs | null;
  title: string;
  video: boolean;
  vote_average?: number;
  vote_count?: number;
  vote?:number;
  file?:File | null;
}

export interface IMultipleList{
    List:ISingleList[];
    Title:string;
}