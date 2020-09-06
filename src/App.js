import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BookAPI from './BookAPI';
import ListBooks from './ListBooks';
import AddBook from './AddBook';

class App extends Component {
  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount() {
    BookAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books
        }))
      })
  }

  updateBookShelf = (book, shelf) => {
    BookAPI.update(book, shelf)
      .then((updatedBook) => {
        book.shelf = shelf;
        this.setState((prevState) => ({
          books: prevState.books.filter((b) => b.id !== book.id).concat(book)
        }))
      });
  }

  searchBook = (value) => {
    if(value === '') {
      this.setState({
        searchBooks: []
      })
    } else if (value !== '') {

      BookAPI.search(value)
        .then((books) => {
          console.log(books, '-- THIS BOOKS IN APP')
          if(!books || books.error) {
            this.setState({
              searchBooks: []
            })
          } else if(Array.isArray(books)) {
            /* We check the book property to see if one of the results from the search
             * is already on the shelf. If it is, we add the the respective shelf for
             * each book so that the user can see this on the search page.
             */
            books.forEach((book) => {
              this.state.books.forEach((onShelfBook) => {
                if(onShelfBook.id === book.id) {
                  book.shelf = onShelfBook.shelf
                }
              })
            })

            this.setState((prevState) => ({
              searchBooks: books.filter((b) => b.imageLinks !== undefined && b.imageLinks.thumbnail !== undefined)
            }))
          }
        })

    }
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateShelf={this.updateBookShelf}
            />
        )}/>

        <Route path='/search' render={() => (
          <AddBook
            onUpdateShelf={this.updateBookShelf}
            onSearchBook={this.searchBook}
            searchResults={this.state.searchBooks}
            />
        )}/>

      </div>
    );
  }
}

export default App;
