"use client";
import React, { useEffect } from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { useAddModalContext } from "@/context/AddFilmModal";
import AddFilmForm from "../AddFilmForm";

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
    minWidth: "50vw",
    border: "none",
    borderRadius: "10px",
    background: `var(--addMovie)`,
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
      <div className="flex justify-end">
        <IoClose onClick={closeModal} className="text-[1.5vw] cursor-pointer" />
      </div>
      <AddFilmForm />
    </Modal>
  );
}

export default AddFilmModal;
