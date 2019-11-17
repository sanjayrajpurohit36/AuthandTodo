import React from "react"
import { connect } from "react-redux";
import "./dashboard.css";
import { logoutUserAction } from "../../Actions/userAction";
import { getAllTaskAction, createTaskAction, deleteTaskAction, editTaskAction } from "../../Actions/taskAction";
const MapStateToProps = (store) => {
    return({
        userData: store.userData.signUpData,
        logoutData: store.userData.logoutData,
        getAllTask: store.todo.getAllTaskData,
        createTask: store.todo.createTask,
        deleteTask: store.todo.deleteTask,
        updateTask: store.todo.updateTask
    })
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            show: true,
            task: [],
            todo : {},
            edit: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.logoutData !== nextProps.logoutData) {
            if(nextProps.logoutData.status) {
                this.props.history.push({
                    pathname: `/login`
                })
            }
        }
        if(this.props.createTask !== nextProps.createTask) {
            if(nextProps.createTask.status) {
                this.setState({
                    show: false
                }, () => {
                    var token = nextProps.userData && nextProps.userData.data && nextProps.userData.data.token ? nextProps.userData.data.token : "";
            this.props.dispatch(getAllTaskAction(token))   
                })
            }
        }
        if(this.props.getAllTask !== nextProps.getAllTask) {
            if(nextProps.getAllTask.status) {
                this.setState({
                    task: nextProps.getAllTask.data
                })
            }
        }
        if(this.props.deleteTask !== nextProps.deleteTask) {
            if(nextProps.deleteTask.status) {
                var token = nextProps.userData && nextProps.userData.data && nextProps.userData.data.token ? nextProps.userData.data.token : "";
                this.props.dispatch(getAllTaskAction(token)) 
            }
        }
        if(this.props.updateTask !== nextProps.updateTask) {
            if(nextProps.updateTask.status) {
                var token = nextProps.userData && nextProps.userData.data && nextProps.userData.data.token ? nextProps.userData.data.token : "";
                this.props.dispatch(getAllTaskAction(token)) 
                this.setState({
                    edit: false
                })
            }
        }
    }

    userLogOut = () => {
        var data = {
            email: this.props.userData && this.props.userData.data && this.props.userData.data.email ? this.props.userData.data.email: "",
            token: this.props.userData && this.props.userData.data && this.props.userData.data.token ? this.props.userData.data.token : ""
        }
        this.props.dispatch(logoutUserAction(data))
    }

    createTask = () => {
        this.setState({ 
            show: true,
            edit: false
        })
    }
    
    getAllTask = () => {
        this.setState({ 
            show: false,
            edit: false
        }, () => {
            var token = this.props.userData && this.props.userData.data && this.props.userData.data.token ? this.props.userData.data.token : "";
            this.props.dispatch(getAllTaskAction(token))            
        })
    }

    getTaskTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    createTaskSuccess = () => {
        var data = {
            text: this.state.title,
            status: false,
            token : this.props.userData && this.props.userData.data && this.props.userData.data.token ? this.props.userData.data.token : ""
        }
        this.props.dispatch(createTaskAction(data))
    }

    deleteTask(id) {
        var data = {
            id: id
        }
        var token= this.props.userData && this.props.userData.data && this.props.userData.data.token ? this.props.userData.data.token : ""
        this.props.dispatch(deleteTaskAction(data, token))
    }

    editTask(value) {
        let todoObj = Object.assign({}, value);
        this.setState({
            todo: todoObj,
            edit: true
        })
    }

    getStatus(e) {
        if(e.target.id==="complete") {
            this.setState({
                todo: {
                    text: this.state.title,
                    id: this.state.todo.id,
                    status: 1
                }
            })
        } else {
            this.setState({
                todo: {
                    text: this.state.title,
                    id: this.state.todo.id,
                    status: 0
                }
            })
        }
    }

    gotoProfile() {
        this.props.history.push({
            pathname: `/dashboard/profile`
        })
    }

    confirmEditTask() {
        this.setState({
            todo: {
                text: this.state.title,
                id: this.state.todo.id,
                status: this.state.todo.status
            }
        }, () => {
            var token = this.props.userData && this.props.userData.data && this.props.userData.data.token ? this.props.userData.data.token : ""
            this.props.dispatch(editTaskAction(this.state.todo, token)) 
        })
    }

    render() {
        return(
        <div className="user-dashboard-main-container">
          <div className="user-dashboard-container-wrapper">
            <div className="user-dashboard-nav row">
              <div className="col-sm-12 col-md-12 col-lg-12 user-dashboard-nav-wrapper">
                <div className="col-md-4 col-lg-4 username btn user-pointer" onClick={this.gotoProfile.bind(this)}>
                  {this.props.userData && this.props.userData.data && this.props.userData.data.name ? this.props.userData.data.name : "username"}
                </div>
                <button onClick={this.userLogOut} className="btn btn-danger">Logout</button>
              </div>
            </div>
            <div className="tab">
                <button className="btn btn-primary" onClick={this.createTask}>create Task</button>
                <button className="btn btn-secondary" onClick={this.getAllTask}>all Task </button> 
            </div>
            <div>
            {
                this.state.show ?
                <div className="task-div">
                    <div>Enter Your Title</div>
                    <div className = "create-task-container"> 
                        <textarea id="task" onChange={this.getTaskTitle}> </textarea>
                    </div>
                    <button className="btn btn-success" onClick={this.createTaskSuccess}>
                    Create</button>
                </div>
                : <div className="user-margin">
                    {
                        this.state.task && this.state.task.length !== 0 ?
                        <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.task.map((value,key) => {
                                    return(
                                        <tr>
                                            <td>{value.text}</td>
                                            <td>{value.status === 0 ? "Pending":"Confirmed"}</td>
                                            <td>{value.created_at.split("T")[0]}</td>
                                            <td>
                                                <button onClick={this.editTask.bind(this, value)} className="btn btn-warning" style={{marginRight: "10px"}}>Edit</button>
                                                <button onClick={this.deleteTask.bind(this, value.id)} className="btn btn-danger">Delete</button> 
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        : <div>No Task</div>
                    }
                </div>
            }
            </div>
            <div> 
            {
                this.state.edit ? 
                <div className = "edit-task-container">
                    <textarea id="task" onChange={this.getTaskTitle}>{this.state.todo.text}</textarea>
                    <div>
                    <input type="radio" name="gender" value="pending" id="pending" checked={this.state.todo.status === 0 ? true: false} onClick={this.getStatus.bind(this)}/> Pending<br></br>
                    <input type="radio" name="gender" value="complete" id="complete" checked={this.state.todo.status === 1 ? true: false} onClick={this.getStatus.bind(this)}/>Complete 
                    </div>
                    <div>
                    <button className="btn btn-success" onClick={this.confirmEditTask.bind(this)}>
                    Done</button>
                    </div>
                </div>
                : 
                ""
            }
            </div>
          </div>
      </div>
        )
    }
}

export default connect(MapStateToProps)(Dashboard);