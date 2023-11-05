import React from 'react'
import styles from './FaceRecognition.module.css'
export const FaceRecognition = ({ imageUrl, box, celeb}) => {
  return (
    <div className={styles.imageContainer}>
      <h3>{celeb.name}</h3>
      <div className={styles.boxContainer}>
        <img className={styles.imageSize} src={imageUrl} alt="" id='inputImage' />
        <div className={styles.boundingBox} style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  )
}
