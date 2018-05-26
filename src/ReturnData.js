import React, { Component } from 'react';

class ReturnData extends Component {
  constructor(props) {
    super(props);
    this.getWeatherData = this.getWeatherData.bind(this);
    this.state = {
      weatherData: null,
      location: null
    }
  }

  getWeatherData() {
    console.log('this is from getWeatherData');
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'
    const targetURL = 'https://api.darksky.net/forecast/7685c4ab164d2cf45c58d6f908d7635a/37.8267,-122.4233?exclude=[currently,minutely,hourly,flags]'
    fetch(proxyURL + targetURL)
      .then(data => data.json())
      .then(results => {
        console.log(results);
        // formats date to e.g. "Sunday May 8"
        const location = results.timezone.split("/").slice(-1)[0].split("_").join(" ");
        // Map through data list and pull out first 5 days //
        let weatherData = [];
        weatherData = results.daily.data.slice(0, 5);
        
        // Animated icons //
        Skycons = () => ({
          "color": "#FFFFFF",
          "resizeClear": true // nasty android hack
        }),
          list = [ // listing of all possible icons
            "clear-day",
            "clear-night",
            "partly-cloudy-day",
            "partly-cloudy-night",
            "cloudy",
            "rain",
            "sleet",
            "snow",
            "wind",
            "fog"
          ];


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
          
          return (
            <div key={index}>
              <p>{weekDay}</p>
              <p>{day.summary}</p>
              <p>Low/High: {`${Math.round(day.temperatureLow)} / ${Math.round(day.temperatureHigh)}`} <span>&#176;</span>F</p>
              <canvas id="icon1" width="128" height="128"></canvas>
              <hr />
            </div>
          )}
          )}
      </div>
    );
  } 



}

export default ReturnData;