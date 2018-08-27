import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OptionSelector extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		options: PropTypes.array.isRequired
	}

	static defaultProps = {
	    options: ['currentlyReading', 'wantToRead', 'read', 'none']
	  }
	render() {
		const { book, options } = this.props

		let optionsChoice = this.props.options.map((option) => {
	      if(option === this.props.book.shelf) {
	        // return <option key={option} value="option" className="selected">{option}</option>
	        if(this.props.book.shelf = "none") {
	          option = "none"
	          return <option key={option} value="option" className="selected">{option}</option>
	        }
	      } else {
	        return <option key={option} value="option">{option}</option>
	      }
	    })
	}
}