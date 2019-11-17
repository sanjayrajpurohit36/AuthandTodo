import React from "react";
import "../signup/signup.css";
import { createUserAction } from "../../../Actions/userAction";
import {connect} from "react-redux";

const MapStateToProps = (store) => {
    return({
        userData: store.userData.signUpData
    })
}
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: {
                name:"",
                email: "",
                password: ""
            },
            signUpError: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.userData !== nextProps.userData) {
            if(nextProps.userData && nextProps.userData.data && nextProps.userData.status) {
                this.props.history.push({
                    pathname: `/dashboard` 
                })
            } 
            if(nextProps.userData && nextProps.userData.status === false && nextProps.userData.message === "Email already exist in system") {
                this.setState({
                    signUpError: true
                })
            }
        }
    }

    getUserInfo = (e) => {
        var input = e.target.value
        if (input && input.length !== 0) {
            var obj = Object.assign({}, this.state.userData)
            var field = e.target.id
            obj[field] = input
            this.setState({
                userData: obj
            })
        }
    }

    goToDashboard = ()  => {
        this.setState({
            signUpError: false
        })
        this.props.dispatch(createUserAction(this.state.userData))
    }

    goToLogin = () => {
        this.props.history.push({
            pathname: `/login`
        })
    }

    render() {
        return(
            <div className="user-auth-main-container">
                <div className="user-auth-nav row">
                    User Signup
                </div>
                <div className="row user-auth-container">
                    <div className="col-sm-8 col-md-6 col-lg-6 user-auth-container-wrapper">
                    <label>Name</label>
                <input type="text" placeholder="Enter your name" id="name" onChange={this.getUserInfo} autoComplete="off"/>
                    <label>Email</label>
                <input type="email" placeholder="Enter your email" id="email" onChange={this.getUserInfo} autoComplete="off"/>
                {
                    this.state.signUpError ?
                    <div>Email Already Exist!! Please try with another email.</div>
                    : null
                }
                <label>Password</label>
                <input type="password" id="password" onChange={this.getUserInfo} autoComplete="off"/>
                <button onClick={this.goToDashboard} className="login-btn">Sign Up</button>
                <div>Or</div>
                <div onClick={this.goToLogin} className="user-pointer">Login</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(MapStateToProps)(Login);