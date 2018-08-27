import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ShelfChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
  }

  static defaultProps = {
    options: ['currentlyReading', 'wantToRead', 'read', 'none']
  }

  render() {
    const { book, books, changeShelf, options } = this.props

    // set current shelf to none as default
    let currentShelf = 'none'

    // if book is in current list, set current shelf to book.shelf
    for (let item of books ) {
      if (item.id === book.id)  {
        currentShelf = item.shelf
        break
      }
    }
    
    let optionsChoice = this.props.options.map((option) => {
      if(option === this.props.book.shelf) {
        return <option key={option} value={option} className="selected">{option}</option>
      } else if (!(this.props.book.shelf)) {
        if(option === 'none') {
          return (
            <option key='none' value="none" className="selected">None</option>
          )
        } else {
            return <option key={option} value={option}>{option}</option>
        }
      } else
        return <option key={option} value={option}>{option}</option>
    })
    

    return (
      <div className="book-shelf-changer">
        <select   onChange={(event) => {changeShelf(book, event.target.value)}}
          defaultValue={ currentShelf } >
          <option value="noValue" disabled>Move to...</option>
          {optionsChoice}
        </select>
      </div>
    )
  }

}

export default ShelfChanger
