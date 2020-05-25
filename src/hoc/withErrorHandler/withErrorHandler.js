import React, { Component } from 'react'
import Auxiliary from '../Auxiliary'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
           this.requestInterceptor =  axios.interceptors.request.use((req) =>  {
                this.setState({ error: null });
                return req;
            });

           this.responseInterceptor = axios.interceptors.response.use((response) => response,
            (error) => {
                this.setState({ error: error.message });
                return Promise.reject(error);
            })
        }

        state = {
            error: null
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        closeModalHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Auxiliary>
                    <Modal show={this.state.error} close={this.closeModalHandler}>
                    { this.state.error }: Unable to perform action.
                    </Modal>
                    <WrapperComponent {...this.props} />
                </Auxiliary>
            )
        }
    }
}

export default withErrorHandler;
