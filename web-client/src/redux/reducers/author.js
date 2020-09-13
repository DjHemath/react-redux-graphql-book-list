const authorReducer = (state = [], action) => {
    console.log(action);
    switch(action.type) {
        case 'SET_AUTHORS':
            state = action.data.authors;
            return state;
        case 'ADD_AUTHOR':
            state = [...state, action.data.author]
            return state;
        case 'EDIT_AUTHOR':
            state = state.map(author => {
                if(author.id === action.data.author.id) {
                    return action.data.author;
                }
                return author;
            });
            return state;
        case 'DELETE_AUTHOR':
            state = state.filter(author => author.id !== action.data.authorId);
            return state;
        default:
            return state;
    }
}

export default authorReducer;