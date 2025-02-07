import { IInitialValues } from "@/components/AddFilmForm/IProps";
import axios from "axios";

const MOVIES_API_URL = "/api/movies";

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
  genres?: any;
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
    if (!isNaN(genreNumber)) {
      return dataAll.filter((movie: any) =>
        movie.genre_ids?.some(
          (genre: any) => genre.toString() === genres || genre === genres
        )
      );
    } else if (genres === "movies") {
      return dataAll;
    } else if (genres === "series") {
      return dataAll.filter((item: any) =>
        item.genre_ids.some((itemGenre: any) => itemGenre === 10751)
      );
    } else if (genres === "kids") {
      return dataAll.filter((item: any) =>
        item.genre_ids.some(
          (itemGenre: any) =>
            itemGenre === 16 ||
            itemGenre === 10751 ||
            itemGenre === 14 ||
            itemGenre === 18
        )
      );
    }
  }
  return dataAll;
};

export const createID = async () => {
  const dataAll = await fetchData(MOVIES_API_URL);
  const sortedList = dataAll.sort((a: any, b: any) => b.id - a.id);
  const newId = Number(sortedList[0].id) + 1;
  return String(newId);
};

// File kaydetmek için önce base64 formatına çevirilmelidir.
// Base64 formatı dosyayı metin olarak temsin eder ve JSON içerisinde saklyabilir
const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const saveForm = async (values: any) => {
  try {
    console.log("📌 Gönderilen form verisi:", values);

    const base64File = values.file
      ? await convertFileToBase64(values.file)
      : null;
    console.log("📂 Base64 Dosya:", base64File?.substring(0, 50) + "...");

    const payload = {
      ...values,
      file: base64File, // MongoDB için Base64 dosya
    };

    console.log("📤 API'ye gönderilen veri:", payload);

    const response = await axios.post(MOVIES_API_URL, payload);
    console.log("✅ Veri başarıyla kaydedildi:", response.data);
  } catch (error) {
    console.error("❌ Hata oluştu:", error);
  }
};
