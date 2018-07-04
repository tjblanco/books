import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import BookControl from './BookControl.jsx'

class Search extends Component {
    state = {
        query: '',
        showingBooks: [],
        noMatch: false
    }

    updateQuery = (query) => {
        if(query.length > 0){ // If the user type something...
            // look for the books
            BooksAPI.search(query).then((books) => {
                if (books.length > 0){
                    // set the correct shelf value
                    books.map((book,idx) => {
                        books[idx].shelf = 'none'
                        this.props.currentBooks.map((b) => {
                            if(b.id === book.id){
                                books[idx].shelf = b.shelf
                            }
                        })
                    })
                    this.setState({showingBooks: books,query:query, noMatch: false})
                } else { // To prevent errors when any book is retrieved
                    this.setState({showingBooks: [], noMatch: true})
                }
            })
        }else{
            this.setState({showingBooks: [], noMatch: false})
        }

    }

    render() {

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
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
                            onChange={(event) => this.updateQuery(event.target.value)}
                            autoFocus="true"
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.showingBooks.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        {/* To avoid errors when book doesn't have image */}
                                        {book.imageLinks ?
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div> :

                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(http://via.placeholder.com/128x193?text=?)'}}></div>
                                        }
                                        <BookControl controlShelf={(book,value) => (this.props.sendChange(book,value))}  book={book}/>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                    { this.state.noMatch  && (
                        <div>
                            <div>
                                <h3> Sorry, we don't have the book you are looking for! Please, try again.</h3>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Search