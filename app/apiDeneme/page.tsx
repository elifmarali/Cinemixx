"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ApiDeneme() {
  const [apiGenres, setApiGenres] = useState([]);
  const [apiMovies, setApiMovies] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("");
        const resMovies = await axios.get("");
        setApiGenres(res.data); // State'i güncelle
        setApiMovies(resMovies.data); // State'
      } catch (error) {
        console.error("API error:", error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    console.log("apiGenres : ", apiGenres);
  }, [apiGenres]);

  useEffect(() => {
    console.log("apiMovies : ", apiMovies);
  }, [apiMovies]);

  return <div>ApiDeneme</div>;
}

export default ApiDeneme;
