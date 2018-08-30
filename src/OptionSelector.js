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
    newBooks: [],
    searchErr: false,
    searchResultBooks: [],
    resultsBooks: []
  }

  getBooks = (event) => {

    const query = event.target.value.trim()
    this.setState({ query: query })

    // if user input => run the search
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
        if(books.length > 0) {
          // let resultsBooks = []
          // let commonBooks = this.props.books.filter(book => books.includes(book.id))
          // resultsBooks.push(commonBooks)
          // let newResults = books.filter(book => !this.props.books.includes(book.id))
          // resultsBooks.concat(newResults)

          // searchResultBooks.push(this.props.books.filter(book => books.includes(book.id)))
          // .push(books.filter(book => !this.props.books.includes(book.id)))
          // let resultsBooks = books.filter(book => this.props.books.filter(item => (book.id === item.id)))

          
          var results = []
          var oldBook = []

          // books.filter(item => {
          //   var resultsBooks = []
          //   resultsBooks.push(this.props.books.filter( book => book.id === item.id ))
          //   // resultsBooks.push(this.props.books.filter( book => resultsBooks.filter(item => book.id === item.id) ))

          //   // var newResults = books.filter(book => !(this.props.books.includes(book)))
          //   // resultsBooks.push(newResults)  
          //   results.push(resultsBooks)   
          // })
          // this.props.books.map(item => {
          //   var resultsBooks = []
          //   resultsBooks.push(books.filter( book => book.id !== item.id ))
          //   results.push(resultsBooks)
          // })

          for(var i = 0; i < books.length; i++) {
            for(var j = 0; j < this.props.books.length; j ++) {
              if(this.props.books[j].id === books[i].id) {
                oldBook = this.props.books[j]
                results.push(oldBook)
              }
            }
            if(oldBook.id !== books[i].id){
              results.push(books[i])
            }
          }

          console.log(results)

          // books.filter(item => this.props.books.filter(book => book.id === item.id))
          // this.props.books.filter(book => books.filter(item => item.id === book.id))
          


          this.setState({newBooks: books, searchErr: false, searchResultBooks: results })
        } else {
          this.setState({newBooks: [], searchErr: true, searchResultBooks: []})
        }
      })

    // if query is empty => reset state to default
    } else this.setState({newBooks: [], searchErr: false, searchResultBooks: [] })
  }

  render() {

    const { query, newBooks, searchErr, searchResultBooks } = this.state
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
