import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BookAPI from './BookAPI';
import ListBooks from './ListBooks';
import AddBook from './AddBook';

class App extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false,
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
    BookAPI.search(value)
      .then((books) => {
        if(!books || books.error || books === '') {
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
      .catch((error) => {
        console.log(error, ' ERROR')
      })
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
