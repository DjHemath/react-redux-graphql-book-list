const bookReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_BOOKS':
            state = action.data.books;
            return state;
        case 'ADD_BOOK':
            state = [...state, action.data.book];
            return state;
        case 'EDIT_BOOK':
            state = state.map(book => {
                if(book.id === action.data.book.id) {
                    return action.data.book;
                }
                return book;
            });
            return state;
        case 'DELETE_BOOK':
            state = state.filter(book => book.id !== action.data.bookId);
            return state;
        default:
            return state;
    }
}

export default bookReducer;