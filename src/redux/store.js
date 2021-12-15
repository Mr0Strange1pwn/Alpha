import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

// Redusers
import authReduser from './redusers/authReduser'
import roleReduser from './redusers/roleReduser'
import empReduser from './redusers/employeeReduser';
import projectReduser from './redusers/projectReduser'
import jobtypeReduser from './redusers/jobtypeReduser';

const rootReducer = combineReducers({
    auth: authReduser,
    role: roleReduser,
    emp: empReduser,
    project: projectReduser,
    jobtype: jobtypeReduser
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store