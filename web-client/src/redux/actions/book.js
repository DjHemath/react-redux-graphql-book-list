export const setBooks = (books) => {
  return {
    type: 'SET_BOOKS',
    data: {
        books
    }
  }
}

export const addBook = (book) => {
    return {
      type: 'ADD_BOOK',
      data: {
          book
      }
    }
  }

  export const editBook = (book) => {
    return {
      type: 'EDIT_BOOK',
      data: {
        book
      }
    }
  }

  export const deleteBook = (bookId) => {
    return {
        type: 'DELETE_BOOK',
        data: {
            bookId
        }
    }
}