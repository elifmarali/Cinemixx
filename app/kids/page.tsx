
"use client"
import React, { useEffect, useState } from "react";
import { getMoviesList } from "@/services/Movies";
import FilmList from "@/components/FilmsList";

function Kids() {
  const [filmList, setFilmList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getMoviesList({ genres: "kids" });
      setFilmList(data);
    }
    fetchData();
  }, []);

  return (<FilmList list={filmList} type="single"/>)
}

export default Kids;