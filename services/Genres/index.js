import axios from "axios";

const GENRES_API_URL = "/api/genres";

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error("ERR " + url + " : " + err.message);
  }
};

export const getGenresList = async () => {
  return await fetchData(GENRES_API_URL);
};
