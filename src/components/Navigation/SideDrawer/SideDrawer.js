import classes from './SideDrawer.module.css';
import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

    let attachedClass = [classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClass=[classes.SideDrawer,classes.Open];

    }

    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClass.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavItems />
            </nav>
            </div>
        </Aux>
        
    );
}

export default sideDrawer;