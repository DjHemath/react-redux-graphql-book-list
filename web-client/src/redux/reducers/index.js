import { combineReducers } from 'redux';
import authorReducer from './author';
import bookReducer from './book';

const allReducers = combineReducers({
    authors: authorReducer,
    books: bookReducer
});

export default allReducers;