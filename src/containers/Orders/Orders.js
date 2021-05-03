import React, { Component } from "react";
import Order from '../../components/Orders/Order';
import axios from '../../axios-orders';
class Orders extends Component{
    state ={
        loading:true,
        orders:[]
    }

    componentDidMount () {
        axios.get('/orders.json').then(res => {

            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            this.setState({loading:false,orders:fetchedOrders});
            console.log(this.state.orders);
        }).catch(err=> {
            this.setState({loading:false});
        })
    }
    render(){
        return(
            <div>
            {this.state.orders.map(order=>(
                <Order key={order.id} ingredients={order.ingredients} price={(+order.price).toFixed(2)}/>
            ))}
            </div>
            
        );
    }
}

export default Orders;