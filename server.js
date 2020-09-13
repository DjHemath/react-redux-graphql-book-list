const express = require('express')
const expressGraphQL = require('express-graphql')
const path = require('path');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const app = express()
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'web-client/build')));
app.use(cors());

let authors = [
	{ id: 1, name: 'J. K. Rowling', noOfBooksPublished: 10 },
	{ id: 2, name: 'J. R. R. Tolkien', noOfBooksPublished: 20 },
	{ id: 3, name: 'Brent Weeks', noOfBooksPublished: 30 }
]

let books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a book written by an author',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    authorId: { type: GraphQLInt },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find(author => author.id === book.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents a author of a book',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
    noOfBooksPublished: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter(book => book.authorId === author.id)
      }
    }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'A Single Book',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => books.find(book => book.id === args.id)
    },
    books: {
      type: new GraphQLList(BookType),
      description: 'List of All Books',
      resolve: () => books
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of All Authors',
      resolve: () => authors
    },
    author: {
      type: AuthorType,
      description: 'A Single Author',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => authors.find(author => author.id === args.id)
    }
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const book = { id: books.length + 1, name: args.name, authorId: args.authorId }
        books.push(book)
        return book
      }
    },

    updateBook: {
        type: BookType,
        description: 'Update a book',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) },
            name: { type: GraphQLString },
            authorId: { type: GraphQLInt }
        },
        resolve: (parent, args) => {
            let updatedBook;
            books = books.map(book => {
                if(book.id === args.id) {
                    book.name = args.name,
                    book.authorId = args.authorId
                    updatedBook = book;
                }
                return book;
            });
            return updatedBook;
        }
    },

    deleteBook: {
        type: new GraphQLObjectType({
            name: 'DeleteBookResponse',
            description: 'Response of a request',
            fields: () => ({
                result: { type: GraphQLString }
            }),
        }),
        description: 'Delete a book',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: (parent, args) => {
            books = books.filter(book => book.id != args.id)
            return {result: 'Success'};
        }
    },

    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        noOfBooksPublished: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        console.log(args);
        const author = { id: authors.length + 1, name: args.name, noOfBooksPublished: args.noOfBooksPublished }
        authors.push(author)
        return author
      }
    },

    updateAuthor: {
        type: AuthorType,
        description: 'Update an author',
        args: {
            id: { type: GraphQLInt },
            name: { type: GraphQLString },
            noOfBooksPublished: { type: GraphQLInt }
        },
        resolve: (parent, args) => {
            let updatedAuthor;
            authors = authors.map(author => {
                if(author.id === args.id) {
                    author.name = args.name || author.name,
                    updatedAuthor = author
                }
                return author;
            })
            return updatedAuthor;
        }
    },

    deleteAuthor: {
        type: new GraphQLObjectType({
            name: 'DeleteAuthorResponse',
            description: 'Response of a request',
            fields: () => ({
                result: { type: GraphQLString }
            }),
        }),
        description: 'Delete an author',
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: (parent, args) => {
            authors = authors.filter(author => author.id != args.id)
            return {result: 'Success'};
        }
    },
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'web-client/build', 'index.html'));
});


app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'web-client/build', 'index.html'));
});


app.listen(process.env.PORT || 5000, () => console.log('Server Running'))