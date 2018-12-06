import React, { Component } from 'react';

//Styles Import
import './styles/main.scss';

//NPM imports
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

//Base API endpoint
import { API_ENDPOINT } from './API';

//Component imports
import Card from './components/Card';

class App extends Component {

  state = {
    loading: true,
    venues: []
  } 

  componentDidMount() {
    this.fetchVenues(`${API_ENDPOINT}/venues`);
  }

  //Could alternatively use async/await rather than axios promises 
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

  showVenues = () => {
    let { venues } = this.state;
    return venues.map( (venue, ind) => {
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

  render() {
    return (
        <div className="container my-4">
          <div className="w-100 my-2 d-flex justify-content-center">
            <ClipLoader
              sizeUnit={"px"}
              size={50}
              color={'#123abc'}
              loading={this.state.loading}
            />
          </div>
          <main className="cards">
            {this.showVenues()}
          </main>
        </div>
    );
  }
}

export default App;
