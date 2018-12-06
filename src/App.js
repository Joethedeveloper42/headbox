import React, { Component } from 'react';

//Styles Import
import './styles/main.scss';

//NPM imports
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

//Base API endpoint
import { API_ENDPOINT } from './API';

//Component imports
import Card from './components/Card';

class App extends Component {

  state = {
    loading: true,
    venues: [],
    currentPage: 1,
    venuesPerPage: 10
  } 

  componentDidMount() {
    this.fetchVenues(`${API_ENDPOINT}/venues`);
  }

  //FETCH VENUE DATA - (Could alternatively use async/await rather than axios promises)
  fetchVenues = (URL) => {
    axios.get(URL)
    .then( res => {
      this.setState({
        venues: res.data,
        loading: false
      })
    })
    .catch( res => console.log('error: ', res))
  }

  //DISPLAY FIRST 10 VENUES
  showVenues = () => {
    let { venues, currentPage, venuesPerPage } = this.state;
    // Logic for displaying correct venues
    const indexOfLastVenue = currentPage * venuesPerPage;
    const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
    const currentVenues = venues.slice(indexOfFirstVenue, indexOfLastVenue);
    return currentVenues.map(venue => {
      return (
        <Card
          key={venue.id}
          name={venue.name}
          address={venue.address1}
          city={venue.city}
          postcode={venue.postcode}
          text={venue.listing_text}
        />
      )
    })
  }

  handleClick = (e) => {
    this.setState({
      currentPage: Number(e.target.id)
    })
  }

  //SHOW PAGINATION BAR (10 PER PAGE)
  showPagination = () => {
     // Logic for displaying pagination
    let { venues, venuesPerPage } = this.state;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(venues.length / venuesPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map( (number,ind) => {
      return (
        <PaginationItem key={ind}>
          <PaginationLink id={ind+1} onClick={this.handleClick}>
            {number}
          </PaginationLink>
        </PaginationItem>
      ) 
    })
  }

  render() {
    return (
        <div className="container my-4">
          <div className="w-100 my-2 d-flex flex-column align-items-center">
            <ClipLoader
              padding={10}
              sizeUnit={"px"}
              size={50}
              color={'#123abc'}
              loading={this.state.loading}
            />
            <Pagination aria-label="Page navigation example">
              {this.showPagination()}
            </Pagination>
          </div>
          <main className="cards">
            {this.showVenues()}
          </main>
        </div>
    );
  }
}

export default App;
