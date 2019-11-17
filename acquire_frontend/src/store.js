import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducer';
import { createLogger } from 'redux-logger';
const loggerMiddleware = createLogger({
	// diff:true
});
export default function configureStore(initialState={}) {
 return createStore(
   rootReducer,
   initialState,
   applyMiddleware(thunk, loggerMiddleware)
 );
}