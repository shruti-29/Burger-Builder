import classes from './Layout.module.css';
import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state={
        showSideDrawer:false
    }

    sideDrawerHandler = () => {
        this.setState({showSideDrawer:false});
    }

    menuHandler = () => {
        this.setState( prevState => 
            { return { showSideDrawer: !prevState.showSideDrawer };
            }
            );
    }
    render() {
        return(
            <Aux>
                <Toolbar toggleMenu={this.menuHandler}/>
                <SideDrawer 
                open = {this.state.showSideDrawer}
                closed={this.sideDrawerHandler}/>
                <main className = {classes.Content}>
                {this.props.children}
                </main>
            </Aux>
        );
    }
} 

export default Layout;