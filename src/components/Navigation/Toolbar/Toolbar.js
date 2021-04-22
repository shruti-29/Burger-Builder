import classes from './Toolbar.module.css';
import React from 'react';
import Logo from '../../Logo/Logo';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        
        <Logo />
        <div>MENU</div>
        <div>......</div>
    </header>
);

export default toolbar;