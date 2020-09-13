export const GET_ALL_AUTHORS = `
    query {
        authors {
            id
            name
            noOfBooksPublished
        }
    }
`

export const ADD_AUTHOR = `
    mutation addAuthor($name:String!, $noOfBooksPublished: Int!) {
        addAuthor(name:$name,noOfBooksPublished:$noOfBooksPublished) {
            name
            id
            noOfBooksPublished
        }
    }
`

export const DELETE_AUTHOR = `
    mutation deleteAuthor($id: Int!){
        deleteAuthor(id:$id) {
            result
        }
    }  
`;

export const EDIT_AUTHOR = `
    mutation updateAuthor($id: Int!, $name: String, $noOfBooksPublished: Int) {
        updateAuthor(id:$id, name:$name, noOfBooksPublished:$noOfBooksPublished){
            id
            name
            noOfBooksPublished
        }
    }
`