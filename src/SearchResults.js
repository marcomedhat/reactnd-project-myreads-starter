import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchResults extends Component {
  static propTypes = {
      books: PropTypes.array.isRequired,
      changeShelf: PropTypes.func.isRequired
    }

  render() {
    const { books, changeShelf } = this.props

    return (
      <div>
        <div className=''>
          <h3>Search returned { books.length } books </h3>
        </div>
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              book={ book }
              books={ books }
              key={ book.id }
              changeShelf={ changeShelf }
            />
          ))}
        </ol>
      </div>
    )
  }
}

export default SearchResults