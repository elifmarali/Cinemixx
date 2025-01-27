import Image from "next/image";
import Link from "next/link";
import React from "react";

function FilmList({ list, type }: { list: any[]; type: string }) {
  console.log("list : ", list);

  return (
    <div className={`flex ${type === "multiple" ? "flex-col" : "flex-row"} flex-wrap justify-center my-5 gap-5`}>
      {
        list.length > 0 ? type === "multiple" ? (
          list.map((filmItem: any) => (
            <div className="flex flex-col gap-4" key={filmItem.Title}>
              <div className="font-bold text-2xl">{filmItem.Title}</div>
              <div className="flex flex-row gap-4">
                {filmItem.List.map((item: any) => (
                  <Link href={`/movies/${item.id}`} key={item.id}>
                    <Image
                      src={item.file ? item.file : `https://image.tmdb.org/t/p/original${item.poster_path}`}
                      alt={item.title}
                      width={type === "multiple" ? 180 : 400}
                      height={type === "multiple" ? 270 : 300}
                      loading="lazy"
                      className="h-[270px] transform transition-transform duration-300 hover:scale-110"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          list?.map((item: any) =>
            <Link href={`/movies/${item.id}`} key={item.id}>
              <Image
                src={item.file ? item.file : `https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt={item.title}
                width={180}
                height={270}
                loading="lazy"
                className="h-[270px] transform transition-transform duration-300 hover:scale-110"
              />
            </Link>
          )
        )
          : (
            <div className="text-lg text-white min-h-[55vh] flex justify-center items-center gap-1">
              Aradığınız türde film bulunamadı. Ana sayfaya yönlendirilmek için  <Link href="/" className="text-sky-500	underline">tıklayınız</Link>...
            </div>
          )
      }
    </div>
  );
}

export default FilmList;
