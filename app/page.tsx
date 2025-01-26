import HomeContainer from "@/contianer/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Netfilm",
  description:
    "Stream the latest movies, TV shows, and exclusive series on Netfilm. Enjoy unlimited entertainment on any device, anytime, anywhere.",
};
export default function Home() {
  return (
    <>
      <HomeContainer />
    </>
  );
}
