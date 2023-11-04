import React from 'react'
import styles from './Rank.module.css'

export const Rank = ({username,entries}) => {
  return (
    <div className={styles.rankContainer}>
        <span>{`${username}, Your current entry count is...`}</span>
        <span className={styles.rankValue}>{`#${entries}`}</span>
    </div>
  )
}