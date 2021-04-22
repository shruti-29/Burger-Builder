import classes from './DrawerToggle.module.css';
import React from 'react';

const drawerToggle = (props) => (
    <div className = {classes.DrawerToggle}onClick={props.toggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;