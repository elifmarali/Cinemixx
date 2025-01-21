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

function BannerSection({ contentType, random, param }: any) {
  const [firstPopularFilm, setFirstPopularFilm] = useState<IBanner>();

  useEffect(() => {
    document.documentElement.style.setProperty("--content-type", contentType ? "80%" : "66%");
    async function fetchFirstMovies() {
      if (random) {
        const res = await getMoviesList({type:"Popular Films"});
        const resLength = res.length;
        const randomNumber = Math.floor(Math.random() * resLength)
        const firstPopularFilm = res[randomNumber];
        setFirstPopularFilm(firstPopularFilm);
      } else {
        const res = await getMoviesList({type:"Popular Films"});
        const findMovie = res.find((item: IBanner) => item.id === param);
        setFirstPopularFilm(findMovie)
      }
    }
    fetchFirstMovies();
  }, []);

  return (
    <div className="fluid flex items-center" style={{ height: "60vh", width: "100%" }}>
      <div className={`${styles.bannerContent}`}>
        <h2 className="text-[72px] font-black uppercase tracking-wide">{firstPopularFilm?.title}</h2>
        <p className={` ${!contentType ? styles.sortContent : ""}`}>{firstPopularFilm?.overview}</p>
        <div className="flex flex-row items-center gap-6 mt-4">
          <Link href={`/movies/${firstPopularFilm?.id}`}><Button text="Play" width={300} height={62} /></Link>
          <FavButton />
        </div>
      </div>
      <div className={styles.moviePoster}>
        <div className={styles.moviePosterOverlay}></div>
        <Image
          unoptimized
          src={`https://image.tmdb.org/t/p/original${firstPopularFilm?.poster_path}`}
          alt={firstPopularFilm?.title || ""}
          fill
        />
      </div>
    </div>
  );
}

export default BannerSection;
