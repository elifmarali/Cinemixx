"use client";
import React, { useEffect, useState } from "react";
import { getGenresList } from "@/services/Genres/index";
import { IGenres } from "./IGenresListProps";
import styles from "@/components/GenresList/styles.module.css";
import Link from "next/link";

function GenresList() {
  const [genresList, setGenresList] = useState<IGenres[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res: IGenres[] = await getGenresList();
        setGenresList(res);
      } catch (err: unknown) {
        if(err instanceof Error){
          console.error("ERR GetGenresList[GenresListComponent]: ", err.message);
        }
        else{
          console.error("Bilinmeyen bir hata oluştu:", err);
        }
      }
    }
    fetchGenres();
  }, []);

  return (
    <div className="grid grid-cols-9 gap-2 max-w-[100%]">
      {genresList.length > 0 &&
        genresList.slice(0, 9).map((genresItem) => (
          <Link
            key={genresItem.id}
            href={`/genres/${genresItem.id}`}
            className={`flex justify-center items-center h-[70px] font-semibold cursor-pointer ${styles.border}`}
          >
            {genresItem.name}
          </Link>
        ))}
    </div>
  );
}

export default GenresList;
