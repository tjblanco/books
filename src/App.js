import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route, Link} from 'react-router-dom'
import Search from './Search.jsx'
import BookShelf from './BookShelf.jsx'

class BooksApp extends React.Component {
    state = {

    }
  render() {
    return (

      <div className="app">

        <Route path='/search' render={() => (
            <Search />
        )}/>

        <Route exact path='/' render={() => (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books">
                    <div className="list-books-content">
                        <BookShelf shelf='reading' heading='Currently Reading'/>
                        <BookShelf shelf='wantRead' heading='Want to Read'/>
                        <BookShelf shelf='read' heading='Read'/>
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
