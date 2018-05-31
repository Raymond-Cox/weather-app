import React, { Component } from 'react';

class ReturnData extends Component {
  constructor(props) {
    super(props);
    this.getWeatherData = this.getWeatherData.bind(this);
    this.geoFindMe = this.geoFindMe.bind(this);
    this.successPos = this.successPos.bind(this);
    this.errorPos = this.errorPos.bind(this);
    this.tempUnitChange = this.tempUnitChange.bind(this);
    this.state = {
      latitude: null,
      longitude: null,
      weatherData: null,
      location: null,
      fahrenheit: true,
      }
    }
  

  successPos = (pos) => {
    const crd = pos.coords;
    let latitude = crd.latitude;
    let longitude = crd.longitude;

    console.log('this is from geoFindMe', latitude, longitude)
    this.getWeatherData(latitude, longitude);
  }

  errorPos = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  geoFindMe = (options) => {
    navigator.geolocation.getCurrentPosition(this.successPos, this.errorPos, options)
  }


  getWeatherData(lat, long) {
    console.log('this is from getWeatherData');
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'
    // const targetURL = 'https://api.darksky.net/forecast/7685c4ab164d2cf45c58d6f908d7635a/37.8267,-122.4233?exclude=[currently,minutely,hourly,flags]'
    let targetURL = 'https://api.darksky.net/forecast/7685c4ab164d2cf45c58d6f908d7635a/' + lat + ',' + long + '?exclude=[currently,minutely,hourly,flags]'
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
            latitude: lat,
            longitude: long,
        });
      })
      .catch(error => {
        console.log('An error occurred: ', error);
        return error;
      });
  }

tempUnitChange() {
    this.setState({
      fahrenheit: !this.state.fahrenheit,
    });
  }

componentWillMount() {
  const options = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  }
  this.geoFindMe(options);
}

  render() {
    console.log(this.state.weatherData);
      return (
        <div className="weatherData">
          <p className="location bold">{this.state.location}</p>
            <div className="card-container">
          {this.state.weatherData && this.state.weatherData.map((day, index) => {
            const time = day.time;
            const weekDay = new Date(time * 1000).toString().split(" ").slice(0, 3).join(" ");
            const iconUrl = "https://webdesignbyraymond.com/weather-app/" + day.icon + ".svg";
            const fahrTemps = Math.round(day.temperatureLow) + "/" + Math.round(day.temperatureHigh);
            const celsTemps = Math.round((day.temperatureLow - 32) * 5 / 9) + "/" + Math.round((day.temperatureHigh - 32) * 5 / 9);
          
          return (
            <div className="card" key={index}>
              <div key={index} className="dailyWeather">
                <p className="bold biggerfont">{weekDay}</p>
                <p className="weatherSummary">{day.summary}</p>
                <p className="tempLH">Low/High: 
                <span className="tempDisplay noselect" onClick={this.tempUnitChange}> 
                    {this.state.fahrenheit ? ` ${fahrTemps}` : ` ${celsTemps}`} 
                <span> &#176;</span>{this.state.fahrenheit ? "F" : "C"}
                </span>
                </p>
                <img src={iconUrl} alt="icon depicting daily weather"></img>
              </div>
            </div>
          )}
          )}
          </div>
          
      </div>
    );
  } 



}

export default ReturnData;