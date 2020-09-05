import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Books from './Books';

class AddBook extends Component {
  static propTypes = {
    onUpdateShelf: PropTypes.func.isRequired,
    onSearchBook: PropTypes.func.isRequired,
    searchResults: PropTypes.array.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState((prevState) => ({
      ...prevState, query
    }))
  }

  handleSearch = (query) => {
    this.updateQuery(query);
    this.props.onSearchBook(query);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            onClick={() => this.handleSearch('')}
            to='/'>
              Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.handleSearch(event.target.value)}
              />

          </div>
        </div>

        <div className="search-books-results">
          <Books
              books={this.props.searchResults}
              onUpdateShelf={this.props.onUpdateShelf}
              />
        </div>

      </div>
    )
  }
}

export default AddBook;
