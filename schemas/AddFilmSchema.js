import * as yup from "yup";

export const validationSchema = yup.object().shape({
  adult: yup.boolean().required(),
  genres_ids: yup
    .array()
    .of(yup.number().required())
    .min(1, "You must select at least 1 genre"),
  original_language: yup
    .string()
    .oneOf(["en", "tr"], "Invalid language")
    .required("You must select a language"),
  original_title: yup.string().required("Original title is required"),
  overview: yup.string().nullable(),
  popularity: yup
    .number()
    .typeError("You must enter a valid number")
    .nullable(),
  release_date: yup
    .date()
    .typeError("You must enter a valid date")
    .nullable(),
  title: yup.string().required("You must enter a title"),
  video: yup.boolean(),
  vote: yup
    .number()
    .typeError("You must enter a valid number")
    .nullable(),
});
