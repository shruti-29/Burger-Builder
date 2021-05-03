import classes from "./NavItem.module.css";
import React from "react";
import { NavLink } from 'react-router-dom';
const navItem = (props)=> (
    <li className={classes.NavItem} >
        <NavLink exact
            to={props.link}
            activeClassName={classes.active}>
            {props.children}</NavLink>
    </li>
);

export default navItem;