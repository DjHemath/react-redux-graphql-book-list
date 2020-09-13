import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as AuthorActions from '../redux/actions/author';
import Swal from 'sweetalert2';
import { addAuthor, deleteAuthor, editAuthor, fetchAllAuthors } from '../graphql/author';

function AuthorListItem({id, name, noOfBooksPublished, editHandler, deleteHandler}) {
    return (
        <div className="list-item">
            <span>{id}</span>
            <span>{name}</span>
            <span>{noOfBooksPublished}</span>
            <span className="button-container">
                <button onClick={() => editHandler({id, name, noOfBooksPublished})}>Edit</button>
                <button onClick={() => deleteHandler(id)}>Delete</button>
            </span>
        </div>
    );
}

class Authors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            noOfBooksPublished: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const author = {
            name: this.state.name,
            noOfBooksPublished: parseInt(this.state.noOfBooksPublished)
        };

        const saveAuthor = await addAuthor(author);
        console.log(saveAuthor);
        this.props.dispatch(AuthorActions.addAuthor(saveAuthor.addAuthor));
        this.setState({
            name: '',
            noOfBooksPublished: 0
        });
    }

    handleEdit = async (editData) => {
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
                <input type="text" id="author-name" class="modal-input" placeholder="Author Name" value="${editData.name}"/>
                <input type="number" id="author-no-of-books-published" class="modal-input" placeholder="No of books published" value="${editData.noOfBooksPublished}"/>
            `,
            focusConfirm: false,
            allowOutsideClick: false,
            preConfirm: () => {
                return {
                    name: document.getElementById('author-name').value,
                    noOfBooksPublished: parseInt(document.getElementById('author-no-of-books-published').value)
                }
            }
        });

        let author;
        if(!value) {
            author = editData;
        } else {
            author = {
                ...value,
                id: editData.id
            };
        }
        await editAuthor(author);
        this.props.dispatch(AuthorActions.editAuthor(author));
    }

    handleDelete = async (id) => {
        await deleteAuthor(id);
        this.props.dispatch(AuthorActions.deleteAuthor(id));
    }

    render() {
        console.log(this.props)
        const authorsList = this.props.authors.map(author => <AuthorListItem key={author.id} {...author} editHandler={this.handleEdit} deleteHandler={this.handleDelete}/>)
        return (
            <section className="authors">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" required name="name" placeholder="Author name" onChange={this.handleChange} value={this.state.name}/>
                    <input type="number" required name="noOfBooksPublished" placeholder="Books published" onChange={this.handleChange} value={this.state.noOfBooksPublished}/>
                    <input type="submit"/>
                </form>
                <div className="author-list">
                    {authorsList}
                </div>
            </section>
        )
    }
}


const mapStateToProps = (store) => {
    return {
        authors: store.authors
    }
}


export default connect(mapStateToProps)(Authors);