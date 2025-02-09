"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "@/schemas/AddFilmSchema";
import styles from "@/components/AddFilmForm/styles.module.css";
import { useAddModalContext } from "@/context/AddFilmModal";
import { createID, saveForm } from "@/services/Movies";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IGenres } from "../GenresList/IGenresListProps";
import { getGenresList } from "@/services/Genres";
import { Checkbox, TextField, Typography } from "@mui/material";
import { IInitialValues, ILanguage } from "./IProps";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Dropzone from "react-dropzone";

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
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(
            "ERR GetGenresList[AddFilmFormComponent]: ",
            err.message
          );
        } else {
          console.error("Bilinmeyen bir hata oluştu:", err);
        }
      }
    }
    fetchGenresList();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: null,
      adult: false,
      genre_ids: [],
      original_language: "",
      original_title: "",
      overview: "",
      popularity: null,
      release_date: null as Dayjs | null,
      title: "",
      video: false,
      vote: null,
      file: null as File | null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values: IInitialValues) => {
      try {
        const newId = await createID();
        values.id = newId;
        const saveObj: IInitialValues = {
          id: newId,
          adult: values.adult,
          genre_ids: values.genre_ids,
          original_language: values.original_language,
          original_title: values.original_title,
          overview: values.overview,
          popularity: values.popularity,
          release_date: values.release_date,
          title: values.title,
          video: values.video,
          vote: values.vote,
          file: values.file,
        };
        await saveForm(saveObj);
        setTimeout(() => {
          closeModal();
        }, 3000);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("AddFilmForm Error : ", err.message);
        } else {
          console.error("Bilinmeyen bir hata oluştu:", err);
        }
      }
    },
  });

  useEffect(() => {
    console.log("values : ", formik.values);
  }, [formik.values]);

  return (
    <>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        {/* Adult Checkbox */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel}>Adult</Typography>
          <Checkbox
            className={styles.formCheckbox}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
            onChange={(e) => {
              formik.setFieldValue("adult", e.target.checked);
            }}
          />
          {formik.touched.adult && formik.errors.adult && (
            <Typography
              color="error"
              gutterBottom
              className={styles.errorMessage}
            >
              {formik.errors.adult}
            </Typography>
          )}
        </FormControl>
        {/* Genres List - Çoklu Seçim */}
        <FormControl className={`w-full ${styles.formItem}`}>
          <Typography className={styles.formLabel}>Genres</Typography>
          <Select
            className={styles.formInput}
            multiple
            value={formik.values.genre_ids}
            onChange={(e) => {
              const selectedValues = Array.isArray(e.target.value)
                ? e.target.value
                : e.target.value.split(",");
              formik.setFieldValue("genre_ids", selectedValues);
            }}
            size="small"
          >
            {genresList.map((genres) => (
              <MenuItem key={genres?.id} value={Number(genres?.id)}>
                {genres?.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.genre_ids && formik.errors.genre_ids && (
            <Typography
              color="error"
              gutterBottom
              className={styles.errorMessage}
            >
              {formik.errors.genre_ids}
            </Typography>
          )}
        </FormControl>
        {/* Original Language */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel}>
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
          {formik.touched.original_language &&
            formik.errors.original_language && (
              <Typography
                color="error"
                gutterBottom
                className={styles.errorMessage}
              >
                {formik.errors.original_language}
              </Typography>
            )}
        </FormControl>
        {/* Original Title */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel}>Original Title</Typography>
          <TextField
            size="small"
            className={styles.formInput}
            name="original_title"
            value={formik.values.original_title}
            onChange={formik.handleChange}
          />
          {formik.touched.original_title && formik.errors.original_title && (
            <Typography
              color="error"
              gutterBottom
              className={styles.errorMessage}
            >
              {formik.errors.original_title}
            </Typography>
          )}
        </FormControl>
        {/* Overview */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel}>Overview</Typography>
          <TextField
            size="small"
            className={styles.formInput}
            name="overview"
            value={formik.values.overview}
            onChange={formik.handleChange}
            multiline
            maxRows={5}
          />
          {formik.touched.overview && formik.errors.overview && (
            <Typography
              color="error"
              gutterBottom
              className={styles.errorMessage}
            >
              {formik.errors.overview}
            </Typography>
          )}
        </FormControl>
        {/* Popularity */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel}>Popularity</Typography>
          <TextField
            size="small"
            className={styles.formInput}
            name="popularity"
            value={formik.values.popularity}
            onChange={formik.handleChange}
          />
          {formik.touched.popularity && formik.errors.popularity && (
            <Typography
              color="error"
              gutterBottom
              className={styles.errorMessage}
            >
              {formik.errors.popularity}
            </Typography>
          )}
        </FormControl>
        {/* Release Date */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel}>Release Date</Typography>
          <DatePicker
            className={styles.formInput}
            name="release_date"
            value={
              formik.values.release_date
                ? dayjs(formik.values.release_date)
                : null
            }
            onChange={(date: Dayjs | null) => {
              if (date) {
                const formattedDate = date.format("YYYY-MM-DD");
                formik.setFieldValue("release_date", formattedDate);
              }
            }}
            format="DD/MM/YYYY"
            slotProps={{ textField: { size: "small" } }}
          />

          {formik.touched.release_date && formik.errors.release_date && (
            <Typography
              color="error"
              gutterBottom
              className={styles.errorMessage}
            >
              {formik.errors.release_date}
            </Typography>
          )}
        </FormControl>
        {/* Title */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel}>Title</Typography>
          <TextField
            size="small"
            className={styles.formInput}
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && (
            <Typography
              color="error"
              gutterBottom
              className={styles.errorMessage}
            >
              {formik.errors.title}
            </Typography>
          )}
        </FormControl>
        {/* Video Checkbox */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel}>Video</Typography>
          <Checkbox
            sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
            onChange={(e) => {
              formik.setFieldValue("video", e.target.checked);
            }}
            className={styles.formCheckbox}
          />
          {formik.touched.video && formik.errors.video && (
            <Typography
              color="error"
              gutterBottom
              className={styles.errorMessage}
            >
              {formik.errors.video}
            </Typography>
          )}
        </FormControl>
        {/* Vote */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel}>Vote</Typography>
          <Rating
            name="text-feedback"
            value={formik.values.vote}
            precision={0.5}
            onChange={(event, newValue) =>
              formik.setFieldValue("vote", newValue)
            }
            icon={<StarIcon fontSize="medium" />}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="medium" />}
          />
          {formik.touched.vote && formik.errors.vote && (
            <Typography
              color="error"
              gutterBottom
              className={styles.errorMessage}
            >
              {formik.errors.vote}
            </Typography>
          )}
        </FormControl>
        {/* Upload File */}
        <FormControl className={styles.formItem}>
          <Typography className={styles.formLabel}>Upload File</Typography>
          <Dropzone
            onDrop={(acceptedFiles) => {
              if (acceptedFiles.length > 0) {
                formik.setFieldValue("file", acceptedFiles[0]);
              }
            }}
            /*accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}*/
            maxFiles={1}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps({
                  className: styles.dropzone,
                })}
              >
                <input {...getInputProps()} />
                <p>
                  Dosyayı buraya sürükleyip bırakın veya dosya seçmek için
                  tıklayın.
                </p>
              </div>
            )}
          </Dropzone>
          {/* Dosya Görüntüleme ve Silme */}
          {formik.values.file && (
            <div className="w-[92%] flex items-center justify-between gap-2 my-2">
              {/* Dosya Adı */}
              <p className="font-medium text-[#2f2f2f]">
                {`${formik.values.file.name.slice(
                  0,
                  5
                )}..${formik.values.file.name.slice(-3)}`}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="bg-[#F0A46F] text-white py-1 px-3 rounded-lg hover:bg-orange-500"
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
                  className="bg-[#E34139] text-white py-1 px-3 rounded-lg hover:bg-red-600"
                  onClick={() => formik.setFieldValue("file", null)}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
          {formik.touched.file && formik.errors.file && (
            <Typography
              color="error"
              gutterBottom
              className={styles.errorMessage}
            >
              {formik.errors.file}
            </Typography>
          )}
        </FormControl>
        {/* Submit Button */}
        <div className="w-full flex justify-end mt-5">
          <button type="submit" className={styles.addButton}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddFilmForm;
