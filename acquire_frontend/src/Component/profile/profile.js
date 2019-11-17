import React from "react"
import { connect } from "react-redux";
import "./profile.css"
import { updateProfileAction } from "./../../Actions/userAction"

const MapStateToProps = (store) => {
    return({
        userData: store.userData.signUpData
    })
}

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userData: {
                name: this.props.userData && this.props.userData.data && this.props.userData.data.name ? this.props.userData.data.name : "",
                newpassword: "",
                cnfrmpassword: "",
                email:  this.props.userData && this.props.userData.data && this.props.userData.data.email ? this.props.userData.data.email : "",
            },
            updateProfile: true,
            showUpdateDiv: false,
            showErr: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.userData && nextProps.userData) {
            if(nextProps.userData.status) {
                this.setState({
                    updateProfile: true,
                    showUpdateDiv: false,
                })
            }
        }
    }

    showUpdateProfile() {
        this.setState({
            updateProfile: false,
            showUpdateDiv: true
        })
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
        } else {
            var obj = Object.assign({}, this.state.userData)
            var field = e.target.id
            obj[field] = input
            this.setState({
                userData: obj
            })
        }
    }

    updateProfile() {
        var token = this.props.userData && this.props.userData.data && this.props.userData.data.token ? this.props.userData.data.token : ""
      
        if(this.state.userData.newpassword === this.state.userData.cnfrmpassword && (this.state.userData  && this.state.userData.name.length !==0 &&this.state.userData.newpassword.length !== 0 && this.state.userData.cnfrmpassword.length !== 0) ) {
            var data = {
                name: this.state.userData.name,
                password: this.state.userData.newpassword
            }
            this.setState({
                showErr: false
            })
            this.props.dispatch(updateProfileAction(data, token))
        } else {
            if(this.state.userData.newpassword !== this.state.userData.cnfrmpassword ) {
                this.setState({
                    showErr: true
                })
            }
            if(this.state.userData.name.length !== 0) {
                var data = {
                    name: this.state.userData.name,
                } 
                this.props.dispatch(updateProfileAction(data, token))
            }
        }
    }

    render() {
        return(
            <div>
               {
                   this.state.userData && this.state.updateProfile ?
                   <div className="user-auth-main-container">
                        <div className="user-auth-nav row">
                             Your Profile
                        </div>
                        <div className="row user-auth-container">
                            <div className="col-sm-8 col-md-6 col-lg-6 user-auth-container-wrapper">
                                <div>Name: {this.state.userData.name}</div>
                                <div>Email: {this.state.userData.email}</div>
                                <div>
                                    <button onClick = {this.showUpdateProfile.bind(this)} className="btn btn-primary">Update Profile</button>
                                </div>
                            </div>
                         </div>
                    </div>
                    : null
                }
                {
                    this.state.showUpdateDiv ? 
                    <div>
                        <div className="user-auth-nav row">Your Profile</div>
                        <div className="row user-auth-container">
                        {this.state.showErr ? <div>Passwords are not match</div> : null}
                            <div className="col-sm-8 col-md-6 col-lg-6 user-auth-container-wrapper">
                                <label>Name</label>
                                <input type="text" id="name" onChange={this.getUserInfo} autoComplete="off" value={this.state.userData.name}/>
                                <label>New Password</label>
                                <input type="password" id="newpassword" onChange={this.getUserInfo} autoComplete="off"/>
                                <label>Confirm Password</label>
                                <input type="password" id="cnfrmpassword" onChange={this.getUserInfo} autoComplete="off"/>
                                <button onClick={this.updateProfile.bind(this)} className="login-btn">Update</button>
                            </div>
                        </div>
                    </div> : null
                }
                </div>
        )
    }
}

export default connect(MapStateToProps)(Profile);