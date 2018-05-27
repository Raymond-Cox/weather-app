import React, { Component } from 'react';

class ReturnData extends Component {
  constructor(props) {
    super(props);
    this.getWeatherData = this.getWeatherData.bind(this);
    this.geoFindMe = this.geoFindMe.bind(this);
    this.state = {
      latitude: null,
      longitude: null,
      weatherData: null,
      location: null,
    }
  }

  
  geoFindMe = () => {
    function success(pos) {
      const crd = pos.coords;
      let latitude = crd.latitude;
      let longitude = crd.longitude;
      console.log('what is this', this);

      // I can't get this.setState here to work properly.
      // this.setState({
      //   latitude: latitude,
      //   longitude: longitude,
      // });
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);
    
  }
  getWeatherData() {
    console.log('this is from getWeatherData');
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'
    const targetURL = 'https://api.darksky.net/forecast/7685c4ab164d2cf45c58d6f908d7635a/37.8267,-122.4233?exclude=[currently,minutely,hourly,flags]'
    // let targetURL = 'https://api.darksky.net/forecast/7685c4ab164d2cf45c58d6f908d7635a/' + this.state.latitude + ',' + this.state.longitude + '?exclude=[currently,minutely,hourly,flags]'
    fetch(proxyURL + targetURL)
      .then(data => data.json())
      .then(results => {
        // formats date to e.g. "Sunday May 8"
        const location = results.timezone.split("/").slice(-1)[0].split("_").join(" ");
        // Map through data list and pull out first 5 days //
        let weatherData = results.daily.data.slice(0, 5);

        this.setState({
            weatherData: weatherData,
            location: location,
        });
      })
      .catch(error => {
        console.log('An error occurred: ', error);
        return error;
      });
  }

componentWillMount() {
  this.geoFindMe();
} 
componentDidMount() {
  this.getWeatherData();
}

  render() {
    console.log(this.state.weatherData);
      return (
        <div>
          <h3>{this.state.location}</h3>
          {this.state.weatherData && this.state.weatherData.map((day, index) => {
            const time = day.time;
            const weekDay = new Date(time * 1000).toString().split(" ").slice(0, 3).join(" ");
            const iconUrl = "http://webdesignbyraymond.com/weather-app/" + day.icon + ".svg";

          return (
            <div key={index}>
              <p>{weekDay}</p>
              <p>{day.summary}</p>
              <p>Low/High: {`${Math.round(day.temperatureLow)} / ${Math.round(day.temperatureHigh)}`} <span>&#176;</span>F</p>
              <img src={iconUrl} alt="icon for weather"></img>
              <hr />
            </div>
          )}
          )}
      </div>
    );
  } 



}

export default ReturnData;