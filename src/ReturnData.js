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
    // fetch('http://api.openweathermap.org/data/2.5/forecast?zip=45679,us&units=imperial&APPID=c30fb0dcacdbff8a6a6331b5b4552e2a')
    fetch('https://api.darksky.net/forecast/7685c4ab164d2cf45c58d6f908d7635a/37.8267,-122.4233', {'mode': 'no-cors' })
      .then(data => data.json())
      .then(results => {
        console.log(results);
        // let weatherData = [];
        // const location = `${results.city.name}, ${results.city.country}`;

        /** Map through data list and pull out every 8 (3pm each day) */
        // for (let i = 5; i < results.list.length; i += 8) {
        //   weatherData.push(results.list[i]);
        // }
        // this.setState({
        //   weatherData: weatherData,
        //   location: location,
        // });
      })
      .catch(error => {
        console.log('An error occurred: ', error);
      });
  }

  componentDidMount() {
    this.getWeatherData();
  }

  render() {
    console.log(this.state.weatherData);
    
    {/*  return (
      <div> 
      </div>
      );
      */}
    

      return (
        <div>
      {/* <h3>{this.state.location}</h3>
          {this.state.weatherData && this.state.weatherData.map((day, index) => {
          const weekDay = new Date(day.dt_txt);
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const dayName = days[weekDay.getDay()];

          
          return (
            <div key={index}>
              <p>{dayName}</p>
              <p>{day.weather[0].main}</p>
              <p>Temperature in F: {day.main.temp}</p>
              <hr />
            </div>
          )}
          )} */}
      </div>
    );
  } 



}

export default ReturnData;