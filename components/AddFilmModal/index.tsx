"use client";
import React, { useEffect } from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import AddFilmForm from "../AddFilmForm";
import { useAddModalContext } from "@/context/AddFilmModal";
import { CiSquarePlus } from "react-icons/ci";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1010,
    minWidth: "60vw",
    border: "none",
    borderRadius: "10px",
    background: `var(--addMovie)`,
    display:"flex",
    flexDirection:"column" as const,
    alignItems:"flex-end",
    justifyContent:"space-between",
  },
};

function AddFilmModal() {
  const { addModal, closeModal } = useAddModalContext();

  useEffect(() => {
    if (!addModal) {
      document.documentElement.style.setProperty(
        "--addMovie",
        "linear-gradient(0.25turn, #7d7d7d, #a8a8a8, #bfbfbf)"
      );
    }
  }, [addModal]);

  return (
    <Modal isOpen={addModal} onRequestClose={closeModal} style={customStyles}>
      <div className="flex justify-between item-center w-[60%] mb-5">
        <div className="flex justify-center items-center gap-2 text-3xl font-black text-[#3a3c45]">
          <CiSquarePlus size={35} />
          <h1>Add Movie</h1>
        </div>
        <IoClose onClick={closeModal} className="text-[1.5vw] cursor-pointer text-[#3a3c45]" />
      </div>

      <AddFilmForm />
    </Modal>
  );
}

export default AddFilmModal;
