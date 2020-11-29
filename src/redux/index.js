import { combineReducers } from 'redux';

import libraryReducer from './reducers/libraryReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
	user: userReducer,
	library: libraryReducer
});

export default rootReducer;