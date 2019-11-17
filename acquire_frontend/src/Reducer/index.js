import { combineReducers } from 'redux';
import todo from './todoReducer';
import userData from "./userReducer";

const appReducer = combineReducers({
    todo,
    userData
})

const rootReducer = ( state, action ) => {
    return appReducer(state, action)
}

export default rootReducer;