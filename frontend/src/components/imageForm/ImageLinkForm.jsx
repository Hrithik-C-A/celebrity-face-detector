import React from 'react';
import styles from './ImageLinkFrom.module.css';

export const ImageLinkForm = ({ description, onInputChange, onPictureSubmit}) => {
  return (
    <div className={styles.formContainer}>
      <p>{description}</p>
      <div className={styles.linkForm}>
        <input
          className={styles.inputContainer}
          type="text"
          placeholder="Paste an image URL here"
          onChange={onInputChange}
        />
        <button className={styles.buttonContainer} onClick={onPictureSubmit}>Detect</button>
      </div>
    </div>
  );
};
