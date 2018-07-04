import React, {Component} from 'react'
import BookControl from './BookControl.jsx'

class BookShelf extends Component {
    sendChange = (book,value) => {
        this.props.changeShelf(book,value)
    }
    render() {
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.heading}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.filter(book => book.shelf === this.props.shelf).map((book) => (
                            <li key={book.id}>
                                <div className="book">

                                    <div className="book-top">
                                        {book.imageLinks ?
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div> :

                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(http://via.placeholder.com/128x193?text=?)'}}></div>
                                        }
                                        < BookControl controlShelf={(book,value) => (this.sendChange(book,value))} book={book}/>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.author}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf