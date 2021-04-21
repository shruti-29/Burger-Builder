import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.3,
    bacon:0.6
}

class BurgerBuilder extends Component{

    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese:0,
            meat : 0            
        },
        totalPrice: 4 ,
        purchasable: false,
        purchasing:false
    }

    updatePurchase  (ingredients)  {
        
        const sum = Object.keys(ingredients).map(igKey => 
            {return ingredients[igKey];}).reduce((sum,el)=>
            {return sum + el;},0);
        this.setState({purchasable: sum > 0});

    }

    purchaseHandler=() => {
        this.setState({purchasing:true});
    }

    purchaseCancel = () => {
        this.setState({purchasing:false});
    }

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
        this.updatePurchase(updatedIngredients);
    };

    removeIngredientsHandler = (type) => {
        const currentCount = this.state.ingredients[type];
        if(currentCount <= 0){
            return;
        }
        const updatedCount = currentCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDecrease = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceDecrease;
        this.setState({totalPrice: newPrice,ingredients: updatedIngredients});
        this.updatePurchase(updatedIngredients);

    };


    render(){
            const disabledInfo = {
                ...this.state.ingredients
            };
            for(let key in disabledInfo){
                disabledInfo[key] = disabledInfo[key] <=0
            }
            
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancel}>
                <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
               <Burger ingredients={this.state.ingredients}/>  
               <BuildControls 
                ingredientsRemoved = {this.removeIngredientsHandler}
                ingredientsAdded= {this.addIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                price={this.state.totalPrice}
                ordered = {this.purchaseHandler}
               />
            </Aux>
        )
    };
}

export default BurgerBuilder;