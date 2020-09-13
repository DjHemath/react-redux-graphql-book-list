import { mutationGraphQL, queryGraphQL, URI } from './';
import { ADD_BOOK, DELETE_BOOK, EDIT_BOOK, GET_ALL_BOOKS } from './queries/book';

export async function fetchAllBooks() {
    const books = await queryGraphQL(GET_ALL_BOOKS);
    return books.books;
}

export async function addBook(book) {
    return await mutationGraphQL(ADD_BOOK, book);
}

export async function deleteBook(id) {
    return await mutationGraphQL(DELETE_BOOK, {id});
}

export async function editBook(book) {
    return await mutationGraphQL(EDIT_BOOK, book)
}