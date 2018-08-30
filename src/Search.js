import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchResults from './SearchResults'
import Book from './Book'

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searchErr: false,
    searchResultBooks: []
  }

  getBooks = (event) => {

    const query = event.target.value.trim()
    this.setState({ query: query })

    // if user input => run the search
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
        if(books.length > 0) {
          let results = []
          let oldBook = []

          for(let i = 0; i < books.length; i++) {
            for(let j = 0; j < this.props.books.length; j ++) {
              if(this.props.books[j].id === books[i].id) {
                oldBook = this.props.books[j]
                results.push(oldBook)
              }
            }
            if(oldBook.id !== books[i].id){
              results.push(books[i])
            }
          }

          this.setState({ searchErr: false, searchResultBooks: results })
        } else {
          this.setState({ searchErr: true, searchResultBooks: []})
        }
      })

    // if query is empty => reset state to default
    } else this.setState({ searchErr: false, searchResultBooks: [] })
  }

  render() {

    const { query, searchErr, searchResultBooks } = this.state
    const { books, changeShelf, book } = this.props

      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search"  to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
                placeholder="Search by title or author"
                value={ query }
                onChange={ this.getBooks } />
            </div>
          </div>
          <div className="search-books-results">
            { searchResultBooks.length > 0 && (
              <SearchResults 
                books={searchResultBooks}
                changeShelf={ changeShelf }
              />
            )}
            { searchErr  && (
              <div>
                <div className=''>
                  <h3>Search returned 0 books.  Please try again!</h3>
                  </div>
                </div>
            )}
          </div>
        </div>
      )}
}
export default Search
