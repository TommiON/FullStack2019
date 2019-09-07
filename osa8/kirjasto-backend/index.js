const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')
// let authors = require('./localBase/authors')
// let books = require('./localBase/books')
const Book = require('./models/book')
const Author = require('./models/author')
const mongoose = require('mongoose')

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
  
  type Query {
    hello: String!
    bookCount: String
    authorCount: String
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
      return Author.find({})
    }
  },

  Author: {
    bookCount: async (root) => {
      const booksWithAuthors = await Book.find({}).populate('author')
      return booksWithAuthors.filter(b => b.author.name === root.name).length
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      let authorOfThis = await Author.findOne({name: args.author})
      if(authorOfThis === null) {
        authorOfThis = new Author({name: args.author})
        authorOfThis.save()
      }
      const book = new Book({title: args.title, author: authorOfThis, published: args.published, genres: args.genres})
      return book.save()
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      const id = author.id
      author.born = args.setBornTo
      const updatedAuthor = await Author.findByIdAndUpdate(id, author, {new:true})
      return updatedAuthor
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