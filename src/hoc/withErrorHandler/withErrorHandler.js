import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../auxiliary';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState( { error: null } );
                return req;
            } );
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( { error: error } );
            } );
        }

        componentWillUnmount () {//removes the old axios Instances
            axios.interceptors.request.eject( this.reqInterceptor ); 
            axios.interceptors.response.eject( this.resInterceptor );
        }

        errorConfirmedHandler = () => { //Sets error back to null when modal is clicked
            this.setState( { error: null } );
        }

        render () {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;