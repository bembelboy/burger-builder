import React, { Component } from 'react';
import { connect } from 'react-redux';

import Main from '../../styledComponents/styledLayout';
import Aux from '../../hoc/auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => { //clean way to toggle when its dependent on the old state
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {

        return (
            <Aux>
                <Toolbar
                    authenticated={this.props.isAuthenticated}
                    clicked={this.sideDrawerToggleHandler}
                    open={this.state.showSideDrawer}
                />
                <SideDrawer
                    authenticated={this.props.isAuthenticated}
                    closed={this.sideDrawerClosedHandler}
                    open={this.state.showSideDrawer}
                />
                <Main>
                    {this.props.children}
                </Main>
            </Aux>
        )
    }
}

const mapstateToProps = (state) => {
    return {
        isAuthenticated: state.auth.idToken !== null, //gives a boolean wether Authenticated is true or not 
    }
}


export default connect(mapstateToProps)(Layout); //exported in App.js