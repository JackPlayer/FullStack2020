
import { gql } from '@apollo/client'
export const ALL_AUTHORS = gql`
query {
  allAuthors {
		name, born,
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title,
    published,
    author {
      name,
    },
    genres
  }
}
`

export const NEW_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author {
      name,
    }
    published,
    genres,
  }
}
`

export const MODIFY_AUTHOR = gql`
mutation modifyAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $born
  ) {
    name,
    born,
    bookCount
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username,
      favoriteGenre
    }
  }
`

export const BOOKS_FOR_ME = gql`
  query {
    booksForMe {
      title,
      published,
      author {
        name,
      },
      genres
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title,
      author {
        name,
      }
      published,
      genres,
    }
  }
`