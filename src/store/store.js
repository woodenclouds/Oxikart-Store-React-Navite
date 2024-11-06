import {createStore} from 'redux';
import rootReducer from './rootReducer'; // Import your root reducer

const store = createStore(rootReducer);

export default store;
