export const GET_ALL_BOOKS = `
    query {
        books {
            id
            name
            authorId
            author {
                name
                id
            }
        }
    }
`

export const ADD_BOOK = `
    mutation addBook($name:String!, $authorId: Int!) {
        addBook(name:$name,authorId:$authorId) {
            name
            id
            authorId
            author {
                id
                name
            }
        }
    }
`

export const DELETE_BOOK = `
    mutation deleteBook($id: Int!){
        deleteBook(id:$id) {
            result
        }
    }  
`;

export const EDIT_BOOK = `
    mutation updateBook($id: Int!, $name: String, $authorId: Int) {
        updateBook(id:$id, name:$name, authorId:$authorId){
            id
            name
            authorId
            author {
                id
                name
            }
        }
    }
`