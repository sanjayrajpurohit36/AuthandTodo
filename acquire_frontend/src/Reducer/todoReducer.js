export default function reducer(state={
    getAllTaskData: {},
    createTask: {},
    deleteTask: {},
    updateTask: {}
}, action) {
    switch(action.type) {
        case "GET_ALL_TASK":
            return {...state, getAllTaskData: action.payload }
        case "CREATE_TASK": 
            return {...state, createTask: action.payload}
        case "UPDATE_TASK": 
            return {...state, updateTask: action.payload}
        case "DELETE_TASK":
            return {...state, deleteTask: action.payload}
        default : {}
    }

    return state;
}