import React, { Component } from "react";
import Header from "./component/Header";
//import PrintType from './component/PrintType';
import "./App.css";

//https://www.googleapis.com/books/v1/volumes?q=pride+prejudice&download=epub&key=yourAPIKey

class App extends Component {
  state = {
    books: [],
    search: "",
    //default value
    printType: "All",
    filter: "No Filter"
  };

  componentDidMount() {
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
  //all the values to be stored

  handleSelectChange = (e) => {
    e.preventDefault();
    this.setState({
      printType: e.target.value
    });
  };

  handleBookType = (e) => {
    e.preventDefault();
    this.setState ({
      filter: e.target.value
    });
  };

  handleInputChange = (e) => {
    console.log(e.target.value);
    this.setState({
      search: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const baseUrl = "https://www.googleapis.com/books/v1/volumes?";
    const searchParam = `q=subject+${this.state.search}`;
    const keyParam = "key=AIzaSyALZcoWIcBmUxohF8HfVzYf-JFBV4JCbC4";
    const typeParam = `printType=${this.state.printType}`;
    const bookType = `filter=${this.state.filter}`
    const url = baseUrl + searchParam + "&" + keyParam + "&" + typeParam + "&" + bookType;

    console.log(url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          books: data.items
        });
      });
  };

  render() {
    return (
      <div className="App">
        <Header />

        <section className="search-bar">
          <form onSubmit={this.handleSubmit}>
            Search:
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleInputChange}
            />
            <input type="submit" value="Search" />
          </form>
        </section>
        <section className="print-type-bar">
          <form onSubmit={this.handleSubmit}>
            <label>
              Print Type:
              <select onChange={this.handleSelectChange}>
                <option value="All">All</option>
                <option value="books">books</option>
              </select>
            </label>
          </form>
        </section>
        <section className="book-type-bar">
          <form onSubmit={this.handleSubmit}>
            <label>
              Book Type:
              <select onChange={this.handleBookType}>
                <option values="no-filter">No Filter</option>
                <option values="ebooks">ebooks</option>
              </select>
            </label>
          </form>
        </section>
        <section className="search-bar"></section>
        <main>
          <ul>
            {this.state.books.length &&
              this.state.books.map((book) =>
                book.volumeInfo.description ? (
                  <li key={book.id}>
                    <img src={book.volumeInfo.imageLinks.thumbnail}></img>
                    <h1>{book.volumeInfo.title}</h1>
                    <p>Author: {book.volumeInfo.authors}</p>
                    <p>Price: {book.saleInfo.listPrice.amount}</p>
                    <p>{book.volumeInfo.description}</p>
                  </li>
                ): null
              )}
          </ul>
        </main>
      </div>
    );
  }
}

export default App;
