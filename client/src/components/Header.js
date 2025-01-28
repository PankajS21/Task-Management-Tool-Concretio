import React from 'react';
import styles from "../styles/task.module.css";
import Logo from "../images/Concretio-white.png";

export default function Header() {
  return (
    <div>
      <div className={styles.main_logo}>
      <img className={styles.logo_img} src={Logo} alt="error"/>
      </div> 
    </div>
  )
}
