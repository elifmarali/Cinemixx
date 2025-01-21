import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="flex justify-center items-center gap-2">
      Made with by
      <Link href="https://www.linkedin.com/in/elifmaral%C4%B1/" target="_blank" className="underline">
        Elif Maralı
      </Link>
    </div>
  );
}

export default Footer;
