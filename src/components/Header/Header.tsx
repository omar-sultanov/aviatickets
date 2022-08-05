import React from 'react'
import styles from './Header.module.scss'
const Header = () => {
  return (
    <div className={styles.Header}>
      <img src={require("../../assets/images/plane.png")} alt="plane icon" />
    </div>
  )
}

export default Header