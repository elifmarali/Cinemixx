import React from 'react';
import { useFormik } from 'formik';
import { validationSchema } from "@/schemas/AddFilmSchema";
import { CiSquarePlus } from "react-icons/ci";
import styles from "@/components/AddFilmForm/styles.module.css"
import { useRouter } from 'next/navigation';
import { useAddModalContext } from '@/context/AddFilmModal';
import { createID } from '@/services/Movies';
const AddFilmForm = () => {
  const { closeModal } = useAddModalContext();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      document.documentElement.style.setProperty("--addMovie", "#00c897");
      const newId = await createID();

      /*       alert("Yeni film ekleme işlemi başarılı."); */
      setTimeout(() => {
        closeModal()
      }, 3000)
    },
  });
  return (
    <>
      <div className='flex justify-center items-center gap-2 text-3xl font-black text-[#3a3c45] mb-5'>
        <CiSquarePlus size={40} />
        <h1>Add Movie</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.formItem}>
          <label htmlFor="firstName" className={styles.formLabel}>First Name</label>
          <input
            className={styles.formInput}
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="email" className={styles.formLabel}>Email Address</label>
          <input
            className={styles.formInput}
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <button type="submit" className={styles.addButton}>Submit</button>
      </form >
    </>
  );
};

export default AddFilmForm;