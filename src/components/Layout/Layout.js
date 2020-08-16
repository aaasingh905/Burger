import React, { Component } from 'react';
import { connect } from 'react-redux'
import Auxil from '../../hoc/Auxil'
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbaar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        return (
            <Auxil>
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxil>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token!== null
    };
}

export default connect(mapStateToProps)(Layout);