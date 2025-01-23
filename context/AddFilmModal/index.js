"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AddModalContext = createContext();

export function AddModalProvider({ children }) {
  const [addModal, setAddModel] = useState(false);

  useEffect(()=>{
    console.log("addModal updated : ", addModal);
  },[addModal]);
  
  // OpenModal
  const openModal = () => {
    setAddModel(true);
  };

  // CloseModal
  const closeModal = () => {
    setAddModel(false);
  };
  const value = {
    addModal,
    openModal,
    closeModal
  };

  return (
    <AddModalContext.Provider value={value}>
      {children}
    </AddModalContext.Provider>
  );
}

export function useAddModalContext() {
  const context = useContext(AddModalContext);
  if (!context) {
    throw new Error(
      "useAddModalContext must be used within an AddModalProvider"
    );
  }
  return context;
}
