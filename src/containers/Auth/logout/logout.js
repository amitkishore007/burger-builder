import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

   render() {
        return !this.props.isAuth ? <Redirect to="/"/> :null;
   }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout : () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout); 
