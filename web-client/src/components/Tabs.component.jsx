import React from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { fetchAllBooks } from '../graphql/book';
import { fetchAllAuthors } from '../graphql/author';
import * as BookActions from '../redux/actions/book';
import * as AuthorActions from '../redux/actions/author';

class Tabs extends React.Component {
    async componentDidMount() {
        const authors =  await fetchAllAuthors();
        this.props.dispatch(AuthorActions.setAuthors(authors));
        const books = await fetchAllBooks();
        this.props.dispatch(BookActions.setBooks(books));
    }

    render() {
        return (
            <div className="tabs">
                <NavLink activeClassName="tab-active" className="tab" to="/books">Books</NavLink>
                <NavLink activeClassName="tab-active" className="tab" to="/authors">Authors</NavLink>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        books: store.books,
        authors: store.authors
    }
}

export default connect(mapStateToProps)(Tabs);