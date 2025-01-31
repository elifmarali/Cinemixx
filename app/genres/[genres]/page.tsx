"use client";
import React, { useEffect, useState } from "react";
import { IGenres } from "./IGenresListProps";
import { getGenresList } from "@/services/Genres";
import { notFound } from "next/navigation";
import { getMoviesList } from "@/services/Movies";
import FilmList from "@/components/FilmsList";

function GenresItem({ params }: { params: Promise<{ genres: string }> }) {
  const [genresList, setGenresList] = useState<IGenres[]>([]);
  const [filmList, setFilmList] = useState([]);
  const [resolvedParams, setResolvedParams] = useState<{ genres: string } | null>(null);

  useEffect(() => {
    // Params'ı çözmek için async bir fonksiyon kullanıyoruz
    const resolveParams = async () => {
      const resolved = await params; // params'ı çöz
      setResolvedParams(resolved); // Çözülen parametreyi state'e kaydet
    };
    
    resolveParams();
  }, [params]); // params değişirse tekrar çalışacak

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await getGenresList();
        setGenresList(res || []);
      } catch (err) {
        console.error("ERR FetchGenres:", err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu");
      }
    };
    fetchGenres();
  }, []); // Yalnızca bileşen ilk yüklendiğinde çalışacak

  useEffect(() => {
    // Eğer resolvedParams yüklendiyse ve genresList mevcutsa filmleri çek
    const fetchMovies = async (genreId: string) => {
      try {
        const data = await getMoviesList({ genres: genreId });
        setFilmList(data);
      } catch (err) {
        console.error("ERR FetchMovies:", err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu");
      }
    };

    if (resolvedParams && genresList.length > 0) {
      const genreId = resolvedParams.genres.trim() ?? "";
      if (genreId && genresList.some((genre) => genre.id === genreId)) {
        fetchMovies(genreId);
      } else {
        notFound();
      }
    }
  }, [genresList, resolvedParams]);

  return (
    <div>
      <FilmList list={filmList} type="single" />
    </div>
  );
}

export default GenresItem;
