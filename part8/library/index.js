const { ApolloServer, UserInputError, gql } = require('apollo-server')
const config = require('./utils/config')
const mongoose = require('mongoose')
const Book = require('./models/Book')

const DB_URL = config.MONGODB
console.log("Connecting to MongoDB on port ", config.PORT)

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int,
    bookCount: Int,
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!,
      setBornTo: Int!,
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let currBooks = Array.from(books);
      if (args.author != undefined) currBooks = currBooks.filter((book) => book.author === args.author)
      if (args.genre != undefined) currBooks = currBooks.filter((book) => book.genres.includes(args.genre))
      return currBooks
    },
    allAuthors: () => authors.map((author) => {
      return {
        name: author.name,
        born: author.born,
        bookCount: books.filter((book) => book.author === author.name).length 
      }
    }) 
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = {...args}
      books = books.concat(newBook)
      let newAuthor = {}
      if (authors.find((author) => author.name === args.author) === undefined) {
        newAuthor = { name: args.author }
        authors = authors.concat(newAuthor)
      }
      return {
        ...newBook
      }
    },
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name == args.name)

      if (author === undefined || author === null) return null

      const newAuthor = {
        ...author, 
        born: args.setBornTo
      }

      authors = authors.map((author) => author.name === newAuthor.name ? newAuthor : author)
      return newAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
