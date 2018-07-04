import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import BookControl from './BookControl.jsx'

class Search extends Component {
    state = {
        query: '',
        showingBooks: []
    }

    updateQuery = (query) => {
        if(query.length){
            this.setState({query})
            BooksAPI.search(query).then((books) => {
                if(books.length){
                    this.setState({showingBooks: books})
                }else{
                    this.setState({showingBooks: []})
                }
            })
        }else{
            this.setState({showingBooks: []})
        }
    }

    // sendChange = (book,value) => {
    //     let link
    //     book.imageLinks ? link = book.imageLinks.thumbnail : link = 'http://via.placeholder.com/128x193?text=?)'
    //     let newBook = {
    //         title: book.title,
    //         author: book.authors,
    //         url: link
    //     }
    //     this.props.changeShelf(newBook, value)
    // }

    render() {
        let {query,showingBooks} = this.state
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
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((book) => (
                            <li key={book.title}>
                                <div className="book">
                                    <div className="book-top">
                                        {book.imageLinks ?
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div> :

                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(http://via.placeholder.com/128x193?text=?)'}}></div>
                                        }
                                        {book.shelf= 'none'}
                                        <BookControl controlShelf={(book,value) => (this.props.sendChange(book,value))}  book={book}/>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search