import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from '../Burger/BurgerIngredients/BurgerIngredients';

const burger = (props) => { 
    const ingredientsArray = Object.keys(props.ingredients).map(
        igKey => {return [...Array(props.ingredients[igKey])].map((_,i) => {
        return <BurgerIngredients key = {igKey + i} type ={igKey} />; 
    });
        });
    
        

    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {ingredientsArray}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
};

export default burger;