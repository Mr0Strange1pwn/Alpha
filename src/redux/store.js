import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

// Redusers
import authReduser from './redusers/authReduser'
import roleReduser from './redusers/roleReduser'

const rootReducer = combineReducers({
    auth: authReduser,
    role: roleReduser
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store