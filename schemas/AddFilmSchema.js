import * as yup from "yup";

export const validationSchema = yup.object().shape({
  adult: yup.boolean().required(),
  genre_ids: yup
    .array()
    .of(yup.number().required())
    .min(1, "You must select at least 1 genre"),
  original_language: yup
    .string()
    .oneOf(["en", "tr"], "Invalid language")
    .required("You must select a language"),
  original_title: yup.string().required("You must enter original title"),
  overview: yup.string().nullable(),
  popularity: yup
    .number()
    .typeError("You must enter a valid number")
    .nullable(),
  release_date: yup.date().typeError("You must enter a valid date").nullable().required("You must enter a required date"),
  title: yup.string().required("You must enter a title"),
  video: yup.boolean(),
  vote: yup.number().typeError("You must enter a valid number").nullable().required("You must enter a vote"),
  file: yup
    .mixed() // Dosya doğrulama için kullanılır
    .nullable() // file alanının başta null olabilmesini sağlar
    .required("You must upload a file")
    .test("fileSize", "File size is too large", (value) => {
      return value ? value.size <= 2 * 1024 * 1024 : true; // Boyut sınırı koyduk - 2MB sınırı
    })
    .test("fileType", "Unsupported file format. Supported file format : JPEG/PNG/PDF", (value) => {
      return value
        ? ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
        : true; // Tip sınırı - JPEG , PNG , PDF türünde dosyalar ekleyebiliriz
    }),
});
