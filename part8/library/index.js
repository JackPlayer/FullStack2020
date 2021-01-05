const { ApolloServer, UserInputError, AuthenticationError, gql, PubSub } = require('apollo-server')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const config = require('./utils/config')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

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
  type User {
    username: String!
    favoriteGenre: String!
    password: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    booksForMe: [Book]!
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

    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token

  }

  type Subscription {
    bookAdded: Book!
  } 
`

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let currBooks = await Book.find({}).populate('author')
      if (args.author != undefined) currBooks = currBooks.filter((book) => book.author === args.author)
      if (args.genre != undefined) currBooks = currBooks.filter((book) => book.genres.includes(args.genre))
      return currBooks
    },
    allAuthors: () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },

    booksForMe: (root, args, context) => {
      if (!context.currentUser) throw new AuthenticationError("Not authenticated")

      const genre = context.currentUser.favoriteGenre

      return Book.find({ genres: genre}).populate('author')

    }
  },
  Mutation: {
    
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) throw new AuthenticationError("Not authenticated")
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
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

      return newBook
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) throw new AuthenticationError("Not authenticated")

      let author
      try {
        author = await Author.findOneAndUpdate({name: args.name}, {$set: {born: args.setBornTo}}, {new : true})
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },

    createUser: async (root, args) => {
      const saltRounds = 10;
      const passwordHashed = await bcrypt.hash(args.password, saltRounds)
      const user = new User({...args, password: passwordHashed})
      try {
        await user.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },

    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if (user === null) return null
      const pwdDecrypted = await bcrypt.compare(args.password, user.password)
      const userForSign ={
        username: args.username, 
      }
      let token
      if (pwdDecrypted) {
        token = {value: jwt.sign(userForSign, config.SECRET) }
      } else {
        throw new UserInputError('Invalid password')
      }
      return token
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.SECRET
      )
      const currentUser = await User.findOne({username: decodedToken.username})
      return { currentUser }
    }  
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)

})
