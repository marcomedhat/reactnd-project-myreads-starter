import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import { Link } from 'react-router-dom'
import Search from './Search'

class BooksApp extends React.Component {
  state = { books: [] }

  componentDidMount() {

    // get books on load
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  changeShelf = ( newBook, newShelf ) => {
    BooksAPI.update(newBook, newShelf).then(response =>{

      // set shelf for new or updated book
      newBook.shelf = newShelf

      // get list of books without updated or new book
      var updatedBooks = this.state.books.filter( book => book.id !== newBook.id )

      // add book to array and set new state
      updatedBooks.push(newBook);
      this.setState({ books: updatedBooks })
    })
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route path="/search" render={( { history }) => (
          <Search
            books={ books }
            changeShelf={ this.changeShelf }
          />
        )} />
        <Route exact  path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookList
              books={ books }
              changeShelf={ this.changeShelf }
            />
            <div className="open-search">
              <Link to="/search">Search</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
