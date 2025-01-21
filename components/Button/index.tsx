import React from 'react'
import styles from "@/components/Button/styles.module.css"
function Button({text,width,height}:any) {
  return (
    <button style={{width:`${width}px`, height:`${height}px`, borderRadius:"9999px"}} className={`rounded-3xl text-[20px] font-bold ${styles.playButton} z-30`}>{text}</button>
  )
}

export default Button
