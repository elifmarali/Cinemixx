"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "@/schemas/AddFilmSchema";
import { CiSquarePlus } from "react-icons/ci";
import styles from "@/components/AddFilmForm/styles.module.css";
import { useAddModalContext } from "@/context/AddFilmModal";
import { createID } from "@/services/Movies";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IGenres } from "../GenresList/IGenresListProps";
import { getGenresList } from "@/services/Genres";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";

const AddFilmForm = () => {
  const [genresList, setGenresList] = useState<IGenres[]>([]);
  const { closeModal } = useAddModalContext();

  useEffect(() => {
    async function fetchGenresList() {
      try {
        const res: IGenres[] = await getGenresList();
        setGenresList(res);
      } catch (err: any) {
        console.error("ERR GetGenresList[AddFilmFormComponent]: ", err.message);
      }
    }
    fetchGenresList();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: 0,
      adult: false,
      genres_ids: [], // Çoklu seçim için dizi
    },
    /*  validationSchema: validationSchema, */
    onSubmit: async (values) => {
      document.documentElement.style.setProperty("--addMovie", "#00c897");
      const newId = await createID();
      values.id = newId;
      console.log("Submitted Data:", values);

      setTimeout(() => {
        closeModal();
      }, 3000);
    },
  });

  return (
    <>
      <div className="flex justify-center items-center gap-2 text-3xl font-black text-[#3a3c45] mb-5">
        <CiSquarePlus size={40} />
        <h1>Add Movie</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        {/* Adult Checkbox */}
        <FormControl className={styles.formItem}>
          <Typography variant="h5">Adult</Typography>
          <Checkbox
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            onChange={(e) => {
              formik.setFieldValue("adult", e.target.checked);
            }}
          />
        </FormControl>
        {/* Genres List - Çoklu Seçim */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel} variant="h5">
            Genres
          </Typography>
          <Select
            className={styles.formInput}
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={formik.values.genres_ids}
            onChange={(e) => {
              const selectedValues = Array.isArray(e.target.value)
                ? e.target.value
                : e.target.value.split(",");
              formik.setFieldValue("genres_ids", selectedValues);
            }}
          >
            {genresList.map((genres) => (
              <MenuItem key={genres?.id} value={genres?.id}>
                {genres?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Submit Button */}
        <button type="submit" className={styles.addButton}>
          Submit
        </button>
      </form>
    </>
  );
};

export default AddFilmForm;
