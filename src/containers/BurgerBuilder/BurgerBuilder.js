import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.3,
    bacon:0.6
}

class BurgerBuilder extends Component{

    state = {
        ingredients : {
            cheese: 0,
            bacon: 0,
            meat: 0,
            salad: 0
        },
        totalPrice: 4 
    };
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const currentCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = currentCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState({totalPrice: newPrice,ingredients: updatedIngredients});
    };


        render(){
        return(
            <Aux>
               <Burger ingredients={this.state.ingredients}/>  
               <BuildControls ingredientsAdded= {this.addIngredientHandler}/>
            </Aux>
        )
    };
}

export default BurgerBuilder;