import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        purchasing:false,
        loading:false
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

    continuePurchase = () => {
        this.setState({loading:true});
        const post = {
            ingredients:this.state.ingredients,
            price: this.state.totalPrice,
            customer:{
                name:'Foodie',
                address:'Test Colony',
                email:'test@test.com'
            },
            deliveryMethod:'fastest'
        }
        axios.post('/orders.json',post)
            .then( response => { 
                this.setState({loading:false,purchasing:false});
                console.log(response);

            })
            .catch(error => {
                this.setState({loading:false,purchasing:false});
                console.log(error);
            })
    };


    render(){
            const disabledInfo = {
                ...this.state.ingredients
            };
            for(let key in disabledInfo){
                disabledInfo[key] = disabledInfo[key] <=0
            }
            let orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                price = {this.state.totalPrice}
                cancel={this.purchaseCancel}
                continue = {this.continuePurchase}
                />
            if(this.state.loading){
                orderSummary = <Spinner />
            }

            
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancel}>
                    {orderSummary}
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