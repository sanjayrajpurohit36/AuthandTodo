import axios from 'axios';


export function createUserAction(data) {
    return function(dispatch) {
        axios.post("http://localhost:3000/api/signup", data)
        .then((response) => {
            dispatch(
                {
                    type: "USER_DATA",
                    payload: response.data
                }
            )
         })
    }
}

export function loginUserAction(data) {
    return function (dispatch) {
        axios.post("http://localhost:3000/api/login", data)
        .then((response) => {
            dispatch({
                type: "USER_DATA",
                payload: response.data
            })
        })
    }
}

export function updateProfileAction(data, token) {
    return function (dispatch) {
        axios.put("http://localhost:3000/api/user", data, {
            headers: {
                'x-access-token': token
            }
        })
        .then((response) => {
            dispatch({
                type: "USER_DATA",
                payload: response.data
            })
        })
    }
}

export function logoutUserAction(data) {
    return function(dispatch) {
        axios.post("http://localhost:3000/api/logout", data.email, {
            headers: {
                'x-access-token': data.token
            }
        }) 
        .then((response) => {
            dispatch({
                type: 'USER_LOGOUT',
                payload: response.data
            })
        })
    }
} 
