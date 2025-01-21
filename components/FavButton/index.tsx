import React from 'react'
import { FaRegHeart } from "react-icons/fa6";
import styles from "@/components/FavButton/styles.module.css"
function FavButton() {
    return (
        <div className={`rounded-full ${styles.border} cursor-pointer`}>
            <FaRegHeart />
        </div>
    )
}

export default FavButton
