import axios from 'axios';

export function getAllTaskAction(data) {
    return function(dispatch) {
        axios.get("http://localhost:3000/api/todo", {
            headers: {
                    'x-access-token': data
            }
        })
        .then((response) => {
            dispatch(
                {
                    type: "GET_ALL_TASK",
                    payload: response.data
                }
            )
         })
    }
}

export function createTaskAction(data) {
    return function(dispatch) {
        let token = data.token;
        delete data.token;
        axios.post("http://localhost:3000/api/todo", data, {
            headers: {
                    'x-access-token': token
            }
        })
        .then((response) => {
            dispatch(
                {
                    type: "CREATE_TASK",
                    payload: response.data
                }
            )
         })
    }
}

export function editTaskAction(data, token) {
    return function(dispatch) {
        axios.put("http://localhost:3000/api/todo", data, {
            headers: {
                    'x-access-token': token
            }
        })
        .then((response) => {
            dispatch(
                {
                    type: "UPDATE_TASK",
                    payload: response.data
                }
            )
         })
    }
}

export function deleteTaskAction(data, token) {
    return function(dispatch) {
        axios.post("http://localhost:3000/api/todo/delete", data, {
            headers: {
                    'x-access-token': token
            }
        })
        .then((response) => {
            dispatch(
                {
                    type: "DELETE_TASK",
                    payload: response.data
                }
            )
         })
    }
}


