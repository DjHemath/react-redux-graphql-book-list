import { fetchAllAuthors } from "../../graphql/author"

export const setAuthors = (authors) => {
  return {
    type: 'SET_AUTHORS',
    data: {
        authors
    }
  }
}


export const addAuthor = (author) => {
  return {
    type: 'ADD_AUTHOR',
    data: {
        author
    }
  }
}

export const editAuthor = (author) => {
    return {
      type: 'EDIT_AUTHOR',
      data: {
          author
      }
    }
}

export const deleteAuthor = (authorId) => {
    return {
        type: 'DELETE_AUTHOR',
        data: {
            authorId
        }
    }
}