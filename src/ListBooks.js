import React, { Component } from 'react';
import Books from './Books';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render() {
    const { books, onUpdateShelf } = this.props;

    const showCurrentlyReading = books.filter(book => book.shelf === "currentlyReading");
    const showWantToRead = books.filter(book => book.shelf === "wantToRead");
    const showRead = books.filter(book => book.shelf === "read");

    //const searchResults = books.filter(book => book.shelf === '');

    return (
      <div className="app">
        <div className="list-books">

          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          <div className="list-books-content">
            <div>

              {/* Displaying the currently reading books */}
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <Books
                      books={showCurrentlyReading}
                      onUpdateShelf={onUpdateShelf}
                      />
                </div>
              </div>

              {/* Displaying the "want to read" books */}
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <Books
                    books={showWantToRead}
                    onUpdateShelf={onUpdateShelf}
                    />
                </div>
              </div>

              {/* Displaying the read books */}
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <Books
                    books={showRead}
                    onUpdateShelf={onUpdateShelf}
                    />
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className="open-search">
          <Link to='/search'>
            <button>
              Add a book
            </button>
          </Link>
        </div>

      </div>
    )
  }
}

export default ListBooks;
