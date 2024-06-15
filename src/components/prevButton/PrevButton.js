import React from 'react'
import styles from './prevButton.module.css'
import localFont from 'next/font/local'

const descriptionFont = localFont({ src: "../../fonts/OpenSans.ttf" })
const PrevButton = () => {
    return (
        <button className={`${styles.cssbuttons} ${descriptionFont.className}`}>
            <div className={styles.icon}>
                <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                        d="M7.828 11L13.192 5.636 11.778 4.222 4 12l7.778 7.778 1.414-1.414L7.828 13H20v-2z"
                        fill="currentColor"
                    ></path>
                </svg>

            </div>
            Previous
        </button>

    )
}

export default PrevButton