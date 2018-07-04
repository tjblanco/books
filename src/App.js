import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route, Link} from 'react-router-dom'
import Search from './Search.jsx'
import BookShelf from './BookShelf.jsx'

class BooksApp extends React.Component {
    state = { books: [] }

    componentDidMount() {

        // get books on load
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
    }

    changeShelf = (book,value) => {
        BooksAPI.update(book, value).then(response =>{
            book.shelf = value
            var updatedBooks = this.state.books.filter( b => b.id !== book.id )
            updatedBooks.push(book);
            this.setState({ books: updatedBooks })
        })
    }
  render() {
    return (

      <div className="app">

        <Route path='/search' render={({history}) => (
            <Search
                sendChange={(book,value) => {
                    this.changeShelf(book, value)
                    history.push('/')
                }} />
        )}/>

        <Route exact path='/' render={() => (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books">
                    <div className="list-books-content">
                        <BookShelf shelf='currentlyReading' heading='Currently Reading' books={this.state.books} changeShelf={(book,value) => this.changeShelf(book,value)}/>
                        <BookShelf shelf='wantToRead' heading='Want to Read' books={this.state.books} changeShelf={(book,value) => this.changeShelf(book,value)}/>
                        <BookShelf shelf='read' heading='Read' books={this.state.books} changeShelf={(book,value) => this.changeShelf(book,value)}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp
