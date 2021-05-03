import classes from './Order.module.css';
import React from 'react';

const order = (props) => {
    const ingredients=[];
    for(let igName in props.ingredients){
        ingredients.push({
            name:igName,
            amount:props.ingredients[igName]
        })
    }

    const ingredientOutput = ingredients.map(ig=>{
        return  <span style={{
            textTransform:'capitalize',
            border:'1px solid #ccc',
            display:'inline-block',
            margin:'0 8px',
            padding:'5px'
        }}
        key={ig.name}>
        {ig.name} ({ig.amount})</span>
    })
       
    
    return(
        <div className={classes.Order}>
            <p>Ingredients :{ingredientOutput}</p>
            <p>Price :<strong>  {props.price} USD</strong></p>
        </div>
    );
    
}

export default order;