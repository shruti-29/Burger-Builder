import classes from './Logo.module.css';
import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = () => (
    <div className={classes.Logo}>
        
    <img src={burgerLogo} alt="My Burger"/>
    </div>
);

export default logo;