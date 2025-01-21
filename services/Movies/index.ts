import axios from "axios";

const MOVIES_API_URL = "http://localhost:3001/movies";

export const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err: any) {
    console.error("ERR [FetchData] MoviesApp : " + err.message);
    return [];
  }
};

export const getMoviesList = async ({
  type,
  genres,
}: {
  type?: string;
  genres?:any
}) => {  
  const dataAll = await fetchData(MOVIES_API_URL);

  if (!dataAll || dataAll.length === 0) {
    console.warn("No data found in the movies API.");
    return [];
  }

  if (type) {
    if (type === "Popular Films") {
      return dataAll.sort((a: any, b: any) => b.popularity - a.popularity);
    }
    if (type === "Your Favorites") {
      return dataAll.sort((a: any, b: any) => b.vote_average - a.vote_average);
    }
    if (type === "Most Rated") {
      return dataAll.sort((a: any, b: any) => b.vote_count - a.vote_count);
    }
  }

  if (genres) {
    const genreNumber = parseInt(genres, 10);
    if(!isNaN(genreNumber)){
      return dataAll.filter((movie: any) =>
        movie.genre_ids.some((genre: any) => genre.toString() === genres)
      );
    }
    else if(genres==="movies"){
      return dataAll;
    }
    else if(genres==="series"){
      return dataAll.filter((item:any)=> item.genre_ids.some((itemGenre:any)=> itemGenre===10751));
    }
    else if(genres==="kids"){
      return dataAll.filter((item:any)=> item.genre_ids.some((itemGenre:any)=> itemGenre===16 || itemGenre===10751 || itemGenre===14|| itemGenre===18));
    }
  }
  return dataAll;
};
