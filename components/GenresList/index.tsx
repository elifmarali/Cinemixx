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
        console.error(
          "ERR GetGenresList[GenresListComponent]: ",
          err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu"
        );
      }
    }
    fetchGenres();
  }, []);

  return (
    <div className={`${styles.genresContainer}`}>
      {genresList.map((genresItem) => (
        <Link
          key={genresItem.id}
          href={`/genres/${genresItem.id}`}
          className={`${styles.genreItem}`}
        >
          {genresItem.name}
        </Link>
      ))}
    </div>
  );
}

export default GenresList;
