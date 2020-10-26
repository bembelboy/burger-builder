import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';

 //Component redirects you to the StartingPage and Sets ID and Token to Null
class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render() { 
        return <Redirect to='/'/>;
    }
}
 
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
    };
}
export default connect(null, mapDispatchToProps)(Logout);