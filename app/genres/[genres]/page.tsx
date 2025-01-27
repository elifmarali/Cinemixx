"use client";
import React, { useEffect, useState, use } from "react";
import { IGenres } from "./IGenresListProps";
import { getGenresList } from "@/services/Genres";
import { notFound } from "next/navigation";
import { getMoviesList } from "@/services/Movies";
import FilmList from "@/components/FilmsList";

function GenresItem({ params }: any) {
  const [genresList, setGenresList] = useState<IGenres[]>([]);
  const genresParams: any = use(params);
  const [filmList, setFilmList] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res: any = await getGenresList();
        setGenresList(res || []);
      } catch (err: any) {
        console.error("ERR FetchGenres : ", err.message);
      }
    }
    fetchGenres();
  }, []);

  useEffect(() => {
    if (genresList.length > 0) {
      if (genresParams.genres) {
        const formattedGenres = genresParams.genres.trim();
        if (genresList?.some((genresItem) => (genresItem.id === Number(formattedGenres) || genresItem.id === formattedGenres))) {
          getList(formattedGenres);
        } else {
          notFound();
        }
      } else {
        console.error("Invalid genresParams:", genresParams);
      }
    }
  }, [genresList, genresParams]);

  const getList = async (id: any) => {
    const data = await getMoviesList({ genres: id });
    setFilmList(data);
  };

  return (
    <div>
      <FilmList list={filmList} type="single"></FilmList>
    </div>
  );
}

export default GenresItem;
