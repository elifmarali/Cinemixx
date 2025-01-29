"use client";
import styles from "@/components/Header/styles.module.css";
import { useAddModalContext } from "@/context/AddFilmModal";
import "@/styles/globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import AddFilmModal from "../AddFilmModal";
import logo from "@/assets/logo.png"
import Image from "next/image";

function Header() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);
  const { openModal } = useAddModalContext();

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <header className={`${styles.header} fluid`}>
      <AddFilmModal/>
      <div className="flex justify-center items-center w-full">
        <div className="flex justify-between items-center py-3 transition ease-in-out delay-150 py-5 w-full max-w-[90%]">
          {" "}
          <Link
            href="/"
            className="flex justify-center items-center text-lg gap-3"
          >
            <Image src={logo} width={200} height={120}/>
          </Link>
          <nav className="flex gap-4">
            <Link
              href="/movies"
              className={`${
                activePath.split("/")[1].trim() === "movies" && "font-semibold"
              } p-2`}
            >
              Movies
            </Link>
            <Link
              href="/series"
              className={`${
                activePath.split("/")[1].trim() === "series" && "font-semibold"
              } p-2`}
            >
              Series
            </Link>
            <Link
              href="/kids"
              className={`${
                activePath.split("/")[1].trim() === "kids" && "font-semibold"
              } p-2`}
            >
              Kids
            </Link>
          </nav>
          <div
            className={`rounded-full ${styles.border} cursor-pointer`}
            onClick={() => openModal()}
          >
            <IoMdAdd className="text-[22px]" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
