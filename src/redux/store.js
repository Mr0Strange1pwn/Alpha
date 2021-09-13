import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

// Redusers
import authReduser from './redusers/authReduser'

const rootReducer = combineReducers({
    auth: authReduser
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store