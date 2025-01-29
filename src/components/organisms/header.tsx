import React from 'react';
import styles from './header.module.css'; 

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
    <div className={styles.blankContainer}></div>
    <h1 className={styles.siteName}><a className={styles.navLink} href="/">TODOLIST</a></h1>
    <nav className={styles.navContainer} >
      <ul className={styles.navList}>
        <li className={styles.navItem}><a className={styles.navLink} href="/about">about </a></li>
        <li className={styles.navItem}><a className={styles.navLink} href="/contact">sign up</a></li>
      </ul>
    </nav>
  </header>
  );
};

export default Header;
