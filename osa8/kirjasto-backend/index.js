const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const uuid = require('uuid/v1')
// let authors = require('./localBase/authors')
// let books = require('./localBase/books')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.connect('mongodb+srv://testi2:testi2@cluster0-1cspe.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
  .then(() => {
    console.log('yhteydessä tietokantaan')
  })
  .catch((error) => {
    console.log('virhe yhdistettäessä tietokantaan:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  
  type Query {
    hello: String!
    bookCount: String
    authorCount: String
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String! 
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    hello: () => { return "world" },
    
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },
    
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length 
    },
    
    allBooks: async (root, args) => {
      console.log('backend, allBooks...')
      let toBeReturned = await Book.find({}).populate('author')
      if(args.author !== undefined) {
        toBeReturned = toBeReturned.filter(book => book.author.name === args.author)
      }
      if(args.genre !== undefined) {
        toBeReturned = toBeReturned.filter(book => book.genres.includes(args.genre))
      }
      return toBeReturned
    },

    allAuthors: () =>  {
      console.log('backend, allAuthors...')
      return Author.find({})
    },

    me: (root, args, context) => {
      console.log('**me** ', context.currentUser )
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      const booksWithAuthors = await Book.find({}).populate('author')
      return booksWithAuthors.filter(b => b.author.name === root.name).length
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      console.log('backend, addBook...')
      // tunnistautuminen...
      const currentUser = context.currentUser
      console.log('current user: ', currentUser)
      if(!currentUser) {
        throw new AuthenticationError("Not authenticated")
      }

      // virheenkäsittelyä...
      if(args.title.length < 2) {
        throw new UserInputError('Title must be at least two characters', {invalidArgs: args.name})

      }
      if(args.author.length < 4) {
        throw new UserInputError('Author name must be at least four characters', {invalidArgs: args.author})
      }

      let authorOfThis = await Author.findOne({name: args.author})
      if(authorOfThis === null) {
        authorOfThis = new Author({name: args.author})
        authorOfThis.save()
      }
      const book = new Book({title: args.title, author: authorOfThis, published: args.published, genres: args.genres})
      return book.save()
    },

    editAuthor: async (root, args, context) => {
      console.log('backend, editAuthor')
      // tunnistautuminen...
      const currentUser = context.currentUser
      console.log('current user: ', currentUser)
      if(!currentUser) {
        console.log('Ei oikeutta muuttaa tietoja!')
        throw new AuthenticationError("Not authenticated")
      }

      const author = await Author.findOne({name: args.name})
      const id = author.id
      author.born = args.setBornTo
      const updatedAuthor = await Author.findByIdAndUpdate(id, author, {new:true})
      return updatedAuthor
    },

    createUser: (root, args) => {
      console.log('***createUser***')
      const user = new User({ username: args.username, favoriteGenre: 'x' })
      console.log('user: ', user)
      return user.save()
      
      // .catch(error => { throw new UserInputError(erros.message, {invalidArgs: args})})
    },

    login: async (root, args) =>  {
      console.log('*** login ***')
      const user = await User.findOne({ username: args.username })
      console.log('user: ', user)
      if( !user || args.password !== 'sekred') {
        throw new UserInputError("Väärät kirjautumistiedot!")
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      console.log('userForToken: ', userForToken)
      console.log('token: ', jwt.sign(userForToken, JWT_SECRET))
      return { value: jwt.sign(userForToken, JWT_SECRET)}
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // console.log('***context***')
    const auth = req ? req.headers.authorization : null
    // console.log('auth: ', auth)
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})