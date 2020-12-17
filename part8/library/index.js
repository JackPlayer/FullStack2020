const { ApolloServer, UserInputError, gql } = require('apollo-server')
const config = require('./utils/config')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')

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
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      let currBooks = Book.find({})
      if (args.author != undefined) currBooks = currBooks.filter((book) => book.author === args.author)
      if (args.genre != undefined) currBooks = currBooks.filter((book) => book.genres.includes(args.genre))
      return currBooks
    },
    allAuthors: () => {
      return Author.find({})
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const authorList = await Author.find({name: args.author})
      let author;
      if (authorList.length === 0) {
        author = new Author({name: args.author})
        await author.save()
      } else {
        author = authorList[0]
      }
      const newBook = new Book ({
        ...args,
        author: author
      })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }


      return newBook
    },
    editAuthor: async (root, args) => {
      let author
      try {
        author = await Author.findOneAndUpdate({name: args.name}, {$set: {born: args.setBornTo}}, {new : true})
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
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
