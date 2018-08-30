import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render() {
    const { book, books, changeShelf, options } = this.props

    // add fallbacks for missing cover images and title
    const coverImg = book.imageLinks.thumbnail
    const title = book.title ? book.title : "No title available"

    return (
          <li>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{ width: 128, height: 193, backgroundImage: `url(${coverImg})`}}>
                </div>
                <ShelfChanger
                  book={ book }
                  books={ books }
                  changeShelf={changeShelf }
                  options={options}
                />
              </div>
              <div className="book-title">{ title }</div>
              { /* Check for authors and render each on separate line if exist*/
                book.authors && book.authors.map((author, index) => (
                  <div className="book-authors" key={index}>{author}</div>
              ))}
            </div>
          </li>
    )
  }

}

export default Book
