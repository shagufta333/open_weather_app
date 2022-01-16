import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    geolocation: {},
  };

 
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async (position) => {

      let { latitude, longitude } = position.coords;
      let locationResponse =
        await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+
      ${longitude}&key=b9c12be57779489fbeefcb17e5daef49`);
      let weatherResponse =
        await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=
      ${longitude}&units=metric&appid=cd05093b096364f3844f82d91da92255`);

      let weatherInfo = {
        city: locationResponse.data.results[0].components.city,
        temp: weatherResponse.data.current.temp,
        description: weatherResponse.data.current.weather[0].description,
      };
       debugger;
      this.setState({ location: weatherInfo });
      
    });
    
  }


  render() {
    return (
      <div data-cy="weather-display">
        <h3>Today's temprature</h3>
        <div data-cy="temp">{this.state.location?.temp}</div>
        <div data-cy="location">{this.state.location?.city}</div>
        <div data-cy="description">{this.state.location?.description}</div>
      </div>
    );
  }
}
export default App;
