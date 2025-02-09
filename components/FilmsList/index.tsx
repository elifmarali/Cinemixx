import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IMultipleList, ISingleList } from "./IFilmListProps";

function FilmList({
  list,
  type,
}: {
  list: Array<IMultipleList | ISingleList>;
  type: string;
}) {
  return (
    <div
      className={`flex ${
        type === "multiple" ? "flex-col" : "flex-row"
      } flex-wrap justify-center my-5 gap-5`}
    >
      {list.length > 0 ? (
        list.map((filmItem) => {
          if ("List" in filmItem) {
            return (
              <div className="flex flex-col gap-4" key={filmItem.Title}>
                <div className="font-bold text-2xl">{filmItem.Title}</div>
                <div className="flex flex-row flex-wrap max-h-[270px] max-w-full whitespace-nowrap overflow-hidden gap-2 justify-around">
                  {filmItem.List.map((item) => (
                    <Link href={`/movies/${item.id}`} key={item.id}>
                      <Image
                        src={
                          typeof item.file === "string"
                            ? item.file
                            : item.file
                            ? URL.createObjectURL(item.file)
                            : `https://image.tmdb.org/t/p/original${item.poster_path}`
                        }
                        alt={item.title}
                        width={type === "multiple" ? 150 : 400}
                        height={type === "multiple" ? 270 : 300}
                        loading="lazy"
                        className="min-w-[100px] h-[270px] transform transition-transform duration-300 hover:scale-110"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            );
          } else {
            return (
              <Link href={`/movies/${filmItem.id}`} key={filmItem.id}>
                <Image
                  src={
                    typeof filmItem.file === "string"
                      ? filmItem.file
                      : filmItem.file
                      ? URL.createObjectURL(filmItem.file)
                      : `https://image.tmdb.org/t/p/original${filmItem.poster_path}`
                  }
                  alt={filmItem.title}
                  width={150}
                  height={270}
                  loading="lazy"
                  className="h-[270px] transform transition-transform duration-300 hover:scale-110"
                />
              </Link>
            );
          }
        })
      ) : (
        <div className="text-lg text-white min-h-[55vh] flex justify-center items-center gap-1">
          Aradığınız türde film bulunamadı. Ana sayfaya yönlendirilmek için{" "}
          <Link href="/" className="text-sky-500 underline">
            tıklayınız
          </Link>
          ...
        </div>
      )}
    </div>
  );
}

export default FilmList;
