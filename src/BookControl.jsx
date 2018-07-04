import React, {Component} from 'react'

class BookControl extends Component {
    manageClick(e) {
        e.preventDefault()
        // Send option selected
        this.props.controlShelf(this.props.book,e.target.value)
    }
    render() {
        return(
            <div className="book-shelf-changer">
                <select onChange={(e) => this.manageClick(e)}>
                    <option  value="move" disabled>Move to...</option>
                    <option  value="currentlyReading" selected={this.props.book.shelf === 'currentlyReading'}>Currently Reading</option>
                    <option  value="wantToRead" selected={this.props.book.shelf === 'wantToRead'}>Want to Read</option>
                    <option  value="read" selected={this.props.book.shelf === 'read'}>Read</option>
                    <option  value="none"  selected={this.props.book.shelf === 'none'} >None</option>
                </select>
            </div>
        )
    }
}

export default BookControl