"use client";
import React, { useEffect, useState } from "react";
import styles from "@/components/BannerSection/styles.module.css";
import { getMoviesList } from "@/services/Movies";
import Image from "next/image";
import { IBanner } from "./IBannerProps";
import "@/styles/globals.css";
import Button from "../Button";
import FavButton from "../FavButton";
import Link from "next/link";
import Rating from "@mui/material/Rating";

function BannerSection({ contentType, random, param }: any) {
  const [firstPopularFilm, setFirstPopularFilm] = useState<IBanner>();
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    if (firstPopularFilm) {
      setRating(firstPopularFilm.vote_average ?? firstPopularFilm.vote ?? 0);
    }
  }, [firstPopularFilm]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--content-type",
      contentType ? "80%" : "66%"
    );
    async function fetchFirstMovies() {
      const res = await getMoviesList({ type: "Popular Films" });
      if (random) {
        const randomNumber = Math.floor(Math.random() * res.length);
        setFirstPopularFilm(res[randomNumber]);
      } else {
        const findMovie = res.find(
          (item: IBanner) => item.id === param || item.id === Number(param)
        );
        setFirstPopularFilm(findMovie);
      }
    }
    fetchFirstMovies();
  }, []);

  return (
    <div
      className="fluid flex items-center"
      style={{ height: "60vh", width: "100%" }}
    >
      <div className={`${styles.bannerContent}`}>
        <h2 className="text-[72px] font-black uppercase tracking-wide">
          {firstPopularFilm?.title}
        </h2>
        <div className="flex gap-1 items-center">
          <Rating
            name="half-rating-read"
            value={rating}
            precision={0.5}
            readOnly
            size="large"
          />
          {firstPopularFilm?.vote_count && (
            <div className="text-sm">({firstPopularFilm?.vote_count})</div>
          )}
        </div>
        <p className={` ${!contentType ? styles.sortContent : ""}`}>
          {firstPopularFilm?.overview}
        </p>
        <div className="flex flex-row items-center gap-6 mt-4">
          <Link href={`/movies/${firstPopularFilm?.id}`}>
            <Button text="Play" width={300} height={62} />
          </Link>
          <FavButton />
        </div>
      </div>
      <div className={styles.moviePoster}>
        <div className={styles.moviePosterOverlay}></div>
        <Image
          unoptimized
          src={
            firstPopularFilm?.file
              ? firstPopularFilm?.file
              : `https://image.tmdb.org/t/p/original${firstPopularFilm?.poster_path}`
          }
          alt={firstPopularFilm?.title || ""}
          fill
        />
      </div>
    </div>
  );
}

export default BannerSection;
