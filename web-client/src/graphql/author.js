import { mutationGraphQL, queryGraphQL, URI } from './';
import { ADD_AUTHOR, DELETE_AUTHOR, EDIT_AUTHOR, GET_ALL_AUTHORS } from './queries/author';

export async function fetchAllAuthors() {
    const authors = await queryGraphQL(GET_ALL_AUTHORS);
    return authors.authors;
}

export async function addAuthor(author) {
    return await mutationGraphQL(ADD_AUTHOR, author);
}

export async function deleteAuthor(id) {
    return await mutationGraphQL(DELETE_AUTHOR, {id});
}

export async function editAuthor(author) {
    return await mutationGraphQL(EDIT_AUTHOR, author)
}