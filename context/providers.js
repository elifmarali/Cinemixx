import  {AddModalProvider}  from "@/context/AddFilmModal/index";

function Providers({ children }) {
  return <AddModalProvider>{children}</AddModalProvider>;
}

export default Providers;