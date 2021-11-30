import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

// Redusers
import authReduser from './redusers/authReduser'
import roleReduser from './redusers/roleReduser'
import empReduser from './redusers/employeeReduser';

const rootReducer = combineReducers({
    auth: authReduser,
    role: roleReduser,
    emp: empReduser
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store