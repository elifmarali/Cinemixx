"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "@/schemas/AddFilmSchema";
import { CiSquarePlus } from "react-icons/ci";
import styles from "@/components/AddFilmForm/styles.module.css";
import { useAddModalContext } from "@/context/AddFilmModal";
import { createID } from "@/services/Movies";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IGenres } from "../GenresList/IGenresListProps";
import { getGenresList } from "@/services/Genres";
import { Checkbox, TextField, Typography } from "@mui/material";
import { IInitialValues, ILanguage } from "./IProps";
import { DatePicker } from "@mui/x-date-pickers";
import { MuiFileInput } from "mui-file-input";

const AddFilmForm = () => {
  const [genresList, setGenresList] = useState<IGenres[]>([]);
  const originalLanguage: ILanguage[] = [
    { name: "English", shortening: "en" },
    { name: "Türkçe", shortening: "tr" },
  ];
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
      id: null,
      adult: false,
      genres_ids: [],
      original_language: "",
      original_title: "",
      overview: "",
      popularity: null,
      release_date: null,
      title: "",
      video: false,
      vote: null,
      file: null as File | null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values: IInitialValues) => {
      try {
        document.documentElement.style.setProperty("--addMovie", "#00c897");
        const newId = await createID();
        values.id = newId;
        console.log("Submitted Data:", values);

        setTimeout(() => {
          closeModal();
        }, 3000);
      } catch (err: any) {
        console.error("AddFilmForm Error : ", err.message);
      }
    },
  });

  useEffect(() => {
    console.log("error : ", formik.errors);
  }, [formik.errors]);

  return (
    <>
      <div className="flex justify-center items-center gap-2 text-3xl font-black text-[#3a3c45] mb-5">
        <CiSquarePlus size={35} />
        <h1>Add Movie</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        {/* Adult Checkbox */}
        <FormControl className={styles.formItem}>
          <Typography variant="h6" className={styles.formLabel}>
            Adult
          </Typography>
          <Checkbox
            className={styles.formCheckbox}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
            onChange={(e) => {
              formik.setFieldValue("adult", e.target.checked);
            }}
          />
        </FormControl>
        {formik.touched.adult && formik.errors.adult && (
          <Typography color="error" variant="body2" gutterBottom>
            {formik.errors.adult}
          </Typography>
        )}
        {/* Genres List - Çoklu Seçim */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel} variant="h6">
            Genres
          </Typography>
          <Select
            className={styles.formInput}
            multiple
            value={formik.values.genres_ids}
            onChange={(e) => {
              const selectedValues = Array.isArray(e.target.value)
                ? e.target.value
                : e.target.value.split(",");
              formik.setFieldValue("genres_ids", selectedValues);
            }}
            size="small"
          >
            {genresList.map((genres) => (
              <MenuItem key={genres?.id} value={genres?.id}>
                {genres?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {formik.touched.genres_ids && formik.errors.genres_ids && (
          <Typography color="error" variant="body2" gutterBottom>
            {formik.errors.genres_ids}
          </Typography>
        )}
        {/* Original Language */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel} variant="h6">
            Original Language
          </Typography>
          <Select
            name="original_language"
            className={styles.formInput}
            value={formik.values.original_language}
            onChange={formik.handleChange}
            size="small"
          >
            {originalLanguage.map((language: ILanguage) => (
              <MenuItem key={language?.shortening} value={language?.shortening}>
                {language?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {formik.touched.original_language &&
          formik.errors.original_language && (
            <Typography color="error" variant="body2" gutterBottom>
              {formik.errors.original_language}
            </Typography>
          )}
        {/* Original Title */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel} variant="h6">
            Original Title
          </Typography>
          <TextField
            size="small"
            className={styles.formInput}
            name="original_title"
            value={formik.values.original_title}
            onChange={formik.handleChange}
          />
        </FormControl>
        {formik.touched.original_title && formik.errors.original_title && (
          <Typography color="error" variant="body2" gutterBottom>
            {formik.errors.original_title}
          </Typography>
        )}
        {/* Overview */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel} variant="h6">
            Overview
          </Typography>
          <TextField
            size="small"
            className={styles.formInput}
            name="overview"
            value={formik.values.overview}
            onChange={formik.handleChange}
          />
        </FormControl>
        {formik.touched.overview && formik.errors.overview && (
          <Typography color="error" variant="body2" gutterBottom>
            {formik.errors.overview}
          </Typography>
        )}
        {/* Popularity */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel} variant="h6">
            Popularity
          </Typography>
          <TextField
            size="small"
            className={styles.formInput}
            name="popularity"
            value={formik.values.popularity}
            onChange={formik.handleChange}
          />
        </FormControl>
        {formik.touched.popularity && formik.errors.popularity && (
          <Typography color="error" variant="body2" gutterBottom>
            {formik.errors.popularity}
          </Typography>
        )}
        {/* Release Date */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel} variant="h6">
            Release Date
          </Typography>
          <DatePicker
            className={styles.formInput}
            name="release_date"
            value={formik.values.release_date}
            onChange={formik.handleChange}
            format="DD/MM/YYYY"
            slotProps={{ textField: { size: "small" } }}
          />
        </FormControl>
        {formik.touched.release_date && formik.errors.release_date && (
          <Typography color="error" variant="body2" gutterBottom>
            {formik.errors.release_date}
          </Typography>
        )}
        {/* Title */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel} variant="h6">
            Title
          </Typography>
          <TextField
            size="small"
            className={styles.formInput}
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </FormControl>
        {formik.touched.title && formik.errors.title && (
          <Typography color="error" variant="body2" gutterBottom>
            {formik.errors.title}
          </Typography>
        )}
        {/* Video Checkbox */}
        <FormControl className={styles.formItem}>
          <Typography variant="h6">Video</Typography>
          <Checkbox
            sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
            onChange={(e) => {
              formik.setFieldValue("video", e.target.checked);
            }}
            className={styles.formCheckbox}
          />
        </FormControl>
        {formik.touched.video && formik.errors.video && (
          <Typography color="error" variant="body2" gutterBottom>
            {formik.errors.video}
          </Typography>
        )}
        {/* Vote */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel} variant="h6">
            Vote
          </Typography>
          <TextField
            size="small"
            className={styles.formInput}
            name="vote"
            value={formik.values.vote}
            onChange={formik.handleChange}
          />
        </FormControl>
        {formik.touched.vote && formik.errors.vote && (
          <Typography color="error" variant="body2" gutterBottom>
            {formik.errors.vote}
          </Typography>
        )}
        {/* Upload File */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel} variant="h6">
            Upload File
          </Typography>
          <MuiFileInput
            className={styles.formInput}
            minRows={60}
            value={formik.values.file}
            onChange={(file) => formik.setFieldValue("file", file)}
          />
        </FormControl>
        {/* Dosya Görüntüleme ve Silme */}
        {formik.values.file && (
          <div className="w-[60%] flex items-center justify-between gap-2 my-2">
            {/* Dosya Adı */}
            <Typography variant="body1" className="font-medium">
              {`${formik.values.file.name.slice(
                0,
                5
              )}...${formik.values.file.name.slice(-8)}`}
            </Typography>
            <div className="flex gap-2">
              <button
                type="button"
                className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                onClick={() => {
                  const url =
                    formik.values.file &&
                    URL.createObjectURL(formik.values.file);
                  if (url) {
                    window.open(url, "_blank");
                  }
                }}
              >
                Show
              </button>
              {/* Sil Butonu */}
              <button
                type="button"
                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                onClick={() => formik.setFieldValue("file", null)}
              >
                Remove
              </button>
            </div>
          </div>
        )}
        {formik.touched.file && formik.errors.file && (
          <Typography color="error" variant="body2" gutterBottom>
            {formik.errors.file}
          </Typography>
        )}
        {/* Submit Button */}
        <button type="submit" className={styles.addButton}>
          Submit
        </button>
      </form>
    </>
  );
};

export default AddFilmForm;
