import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.3,
    bacon:0.6
}

class BurgerBuilder extends Component{

    state = {
        ingredients : null,
        totalPrice: 4 ,
        purchasable: false,
        purchasing:false,
        loading:false,
        error: false
    }

    componentDidMount() {
        axios.get('https://build-burger-6bab6-default-rtdb.firebaseio.com/ingredients.json')
        .then(resp=>{
            this.setState({ingredients:resp.data});
        })
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
       

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search: '?' + queryString
        })
        //to push checkout page onto the stack
        
    };


    render(){
            const disabledInfo = {
                ...this.state.ingredients
            };
            for(let key in disabledInfo){
                disabledInfo[key] = disabledInfo[key] <=0
            }            
            let orderSummary = null;
            let burger = <Spinner />
            if(this.state.ingredients){
                burger = <Aux>
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
                orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                price = {this.state.totalPrice}
                cancel={this.purchaseCancel}
                continue = {this.continuePurchase}
                />
            }

            if(this.state.loading){
                orderSummary = <Spinner />
            }

            
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancel}>
                    {orderSummary}
                </Modal>
               {burger}
            </Aux>
        )
    };
}
export default withErrorHandler(BurgerBuilder, axios);