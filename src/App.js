import React, { Component } from 'react';
import Header from './component/Header';
//import PrintType from './component/PrintType';
import './App.css';

//https://www.googleapis.com/books/v1/volumes?q=pride+prejudice&download=epub&key=yourAPIKey

class App extends Component {

  state = {
    books:[],
    search: '',
    //default value
    printtype: 'All'
  }

  componentDidMount(){
    // const baseUrl= 'https://www.googleapis.com/books/v1/volumes?q='
    // const query = 'subject+Henry'
    // const key = '&key=AIzaSyALZcoWIcBmUxohF8HfVzYf-JFBV4JCbC4'
    // const url = baseUrl + query + key

    // fetch(url)
    // .then(res => res.json())
    // .then(data=> {
    //   console.log(data) 
    //   this.setState({
    //     books:data.items
    //   })
    // })
  }

  //handle print type filter search 
  //all the values to be store 

  handlePrintType = (e) => {
    e.preventDefault();
    this.setState()
  }

  handleSearch = (e) => {
    console.log(e.target.value);
    this.setState({
      search: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const baseUrl= 'https://www.googleapis.com/books/v1/volumes?q='
    const query = `subject+${this.state.search}`
    const key = '&key=AIzaSyALZcoWIcBmUxohF8HfVzYf-JFBV4JCbC4'
    const url = baseUrl + query + key

    fetch(url)
    .then(res => res.json())
    .then(data=> {
      console.log(data) 
      this.setState({
        books:data.items
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Header />

        <section className="search-bar">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleSearch}
            />
            <input type="submit" value="Search" />
          </form>
        </section>
        <section className="print-type-bar">
          <form onSubmit={this.handleSubmit}>
            <label>
              Print Type: 
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="All">All</option>
                <option value="Books">Books</option>
              </select>
            </label>
          </form>
        </section>
        <section className="filter-bar"></section>
        <main>
          <ul>
            {this.state.books.length &&
              this.state.books.map((book) =>
                book.volumeInfo.description ? (
                  <li key={book.id}>
                    <h1>{book.volumeInfo.title}</h1>
                    <p>{book.volumeInfo.description}</p>
                  </li>
                ) : null
              )}
          </ul>
        </main>
      </div>
    );
  }
}

export default App;