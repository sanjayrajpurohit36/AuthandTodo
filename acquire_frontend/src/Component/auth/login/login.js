import React from "react";
import "../login/login.css";
import { loginUserAction } from "../../../Actions/userAction";
import { connect } from "react-redux";

const MapStateToProps = (store) => {
    return ({
        userData: store.userData.signUpData 
    })
}
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: {
                email: "",
                password: ""
            },
            showErr: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.userData !== nextProps.userData) {
            if(nextProps.userData.status) {
                this.props.history.push({
                    pathname: `/dashboard`
                })
            }
            if(nextProps.userData.status===false && nextProps.userData.message === "Invalid password!") {
                this.setState({
                    showErr: true
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
        this.props.dispatch(loginUserAction(this.state.userData))
        this.setState({
            showErr: false
        })
    }

    goToSignUp = () => {
        this.props.history.push({
            pathname: `/`
        })
    }


    render() {
        return(
            <div className="user-auth-main-container">
                <div className="user-auth-nav row">
                    User Login
                </div>
                <div className="row user-auth-container">
                    <div className="col-sm-8 col-md-6 col-lg-6 user-auth-container-wrapper">
                    <label>Email</label>
                <input type="email" placeholder="Enter your email" id="email" onChange={this.getUserInfo} autoComplete="off"/>
                <label>Password</label>
                <input type="password" id="password" onChange={this.getUserInfo} autoComplete="off"/>
                {
                    this.state.showErr ?
                    <div>Invalid Credentials</div>
                    :null
                }
                <button onClick={this.goToDashboard} className="login-btn">Login</button>
                <div>Or</div>
                <div onClick={this.goToSignUp} className="user-pointer">Sign Up</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(MapStateToProps)(Login)