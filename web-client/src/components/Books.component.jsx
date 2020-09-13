import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as BookActions from '../redux/actions/book';
import Swal from 'sweetalert2';
import { addBook, deleteBook, editBook, fetchAllBooks } from '../graphql/book';

function BookListItem({id, name, authorId, editHandler, deleteHandler, author}) {
    return (
        <div className="list-item">
            <span>{id}</span>
            <span>{name}</span>
            <span>{author.name || ''}</span>
            <span className="button-container">
                <button onClick={() => editHandler({id, name, authorId})}>Edit</button>
                <button onClick={() => deleteHandler(id)}>Delete</button>
            </span>
        </div>
    );
}

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            authorId: 0
        }
    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const book = {
            name: this.state.name,
            authorId: parseInt(this.state.authorId)
        };

        const savedBook = await addBook(book);
        console.log(savedBook);

        this.props.dispatch(BookActions.addBook(savedBook.addBook));
        this.setState({
            name: '',
            authorId: ''
        });
    }

    handleEdit = async (editData) => {
        const authorsList = this.props.authors.map(author => `<option key="${author.id}" value="${author.id}">${author.name}</option>`);
        const { value } = await Swal.fire({
            title: 'Edit Author',
            showCancelButton: true,
            width: 600,
            padding: '3em',
            background: '#fff url(https://sweetalert2.github.io//images/trees.png)',
            backdrop: `
                rgba(0,0,123,0.4)
                url("https://sweetalert2.github.io//images/nyan-cat.gif")
                left top
                no-repeat
            `,
            html: `
                <input type="text" id="book-name" class="modal-input" required placeholder="Author Name" value="${editData.name}"/>
                <select id="book-authorId" class="modal-input" required value=${editData.authorId}>
                    ${authorsList}
                </select>
            `,
            focusConfirm: false,
            allowOutsideClick: false,
            preConfirm: () => {
                const name = document.getElementById('book-name').value;
                const authorId = parseInt(document.getElementById('book-authorId').value);
                return {
                    name,
                    authorId
                }
            }
        });
        let book = {};
        if(!value) {
            book = editData;
        } else {
            book = {
                ...value,
                id: editData.id
            };
        }
        const editedBook = await editBook(book);
        console.log(editedBook);
        this.props.dispatch(BookActions.editBook(editedBook.updateBook));
    }

    handleDelete = async (id) => {
        await deleteBook(id)
        this.props.dispatch(BookActions.deleteBook(id));
    }

    render() {
        // const GET_BOOKS = gql`
        //     {
        //         books{
        //         authorId
        //         id
        //         name
        //         }
        //     }
        // `;
        const booksList = this.props.books.map(book => <BookListItem key={book.id} {...book} editHandler={this.handleEdit} deleteHandler={this.handleDelete}/>)
        const authorsList = this.props.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>);
        return (
            <section className="books">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" required name="name" placeholder="Book name" onChange={this.handleChange} value={this.state.name}/>
                    <select name="authorId" required onChange={this.handleChange} value={this.state.authorId}>
                        {authorsList}
                    </select>
                    <input type="submit"/>
                </form>
                <div className="book-list">
                    {booksList}
                </div>
            </section>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        books: store.books,
        authors: store.authors
    }
}


export default connect(mapStateToProps)(Books);