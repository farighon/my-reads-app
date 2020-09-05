import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Books extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render() {
    const { books, onUpdateShelf } = this.props;

    return (
      <div>
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                  <div className="book-shelf-changer">
                    <select
                        value={book.shelf !== undefined ? book.shelf : "none"}
                        onChange={(event) => onUpdateShelf(book, event.target.value)}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                  {book.authors !== undefined && book.authors.map((author) => author).join(', ')}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default Books;
