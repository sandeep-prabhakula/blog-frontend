import React from 'react'
import styles from './closeButton.module.css'
const CloseButton = () => {
    return (
        <button className={`${styles.button}`}>
            <span className={`${styles.X}`}></span>
            <span className={`${styles.Y}`}></span>
            <div className={`${styles.close}`}>Close</div>
        </button>

    )
}

export default CloseButton