import classes from './ContactData.module.css';
import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
class ContactData extends Component{

    state = {
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }

    orderHandler = (event) => {
        event.preventDefault();
         this.setState({loading:true});
        const post = {
            ingredients:this.props.ingredients,
            price: this.props.price,
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
                this.props.history.push('/');

            })
            .catch(error => {
                this.setState({loading:false,purchasing:false});
                console.log(error);
            })
    }
    render(){
        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="text" name="email" placeholder="Your mail" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Your pincode" />
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;