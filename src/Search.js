import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchResults from './SearchResults'

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    newBooks: [],
    searchErr: false
  }

  getBooks = (event) => {

    const query = event.target.value.trim()
    this.setState({ query: query })

    // if user input => run the search
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
        if(books.length > 0) {
          for(let i = 0; i < books.length; i++) {
            for(let j = 0; j < this.props.books.length; j ++) {
              if(this.props.books[j].id === books[i].id) {
                books.splice(books.indexOf(books[i]), 1)
                books.push(this.props.books[j])
              }
            }
          }

          this.setState({ searchErr: false, newBooks: books })
        } else {
          this.setState({ searchErr: true, newBooks: []})
        }
      })
    // if query is empty => reset state to default
    } else this.setState({newBooks: [], searchErr: false })
  }

  render() {

    const { query, newBooks, searchErr } = this.state
    const { books, changeShelf } = this.props

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
            { newBooks.length > 0 && (
              <SearchResults 
                books={newBooks}
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
