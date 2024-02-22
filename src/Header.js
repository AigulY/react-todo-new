import React from 'react';
import styles from './Header.module.css';
import logo from './logo.jpeg'

const Header = () => {
    return (
        <div className={styles.header}>
            <img src={logo} alt="Todo Logo" className={styles.logo}/>
            <div className={styles.headerText}>TODO APP</div>
        </div>
    );
};

export default Header;

