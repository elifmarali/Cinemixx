"use client";
import BannerSection from "@/components/BannerSection";
import FilmList from "@/components/FilmsList";
import GenresList from "@/components/GenresList";
import styles from "@/contianer/Home/styles.module.css";
import { getMoviesList } from "@/services/Movies";
import { useEffect, useState } from "react";
function HomeContainer() {
  const [popularFilmList, setPopularFilmList] = useState([]);
  const [favoritesFilmList, setFavoriteFilmList] = useState([]);
  const [mostRated, setMostRated] = useState([]);

  const filmList = [
    {
      List: popularFilmList,
      Title: "Popular Films",
    },
    {
      List: favoritesFilmList,
      Title: "Favorites Films",
    },
    {
      List: mostRated,
      Title: "Most Rated Films",
    },
  ];

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res: any = getMoviesList({ type: "Popular Films" });
        const res2: any = getMoviesList({ type: "Your Favorites" });
        const res3: any = getMoviesList({ type: "Most Rated" });
        const [resPopular, resFavorites, resRated] = await Promise.all([
          res,
          res2,
          res3,
        ]);
        setPopularFilmList(resPopular.slice(0, 7) || []);
        setFavoriteFilmList(resFavorites.slice(0, 7) || []);
        setMostRated(resRated.slice(0, 7) || []);
      } catch (err: any) {
        console.error("ERR FetchMovies : ", err.message);
      }
    }
    fetchMovies();
  }, []);
  return (
    <div className={styles.containerHome}>
     <BannerSection contentType={false} random={true} />
      <div className={styles.bottomSection}>
        <GenresList />
        <FilmList list={filmList} type="multiple" />
      </div>
    </div>

  );
}

export default HomeContainer;
