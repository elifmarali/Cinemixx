import { AddModalProvider } from "@/context/AddFilmModal/index";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function Providers({ children }) {
  return (
    <AppRouterCacheProvider options={{ key: "css" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AddModalProvider>{children}</AddModalProvider>
      </LocalizationProvider>
    </AppRouterCacheProvider>
  );
}

export default Providers;
