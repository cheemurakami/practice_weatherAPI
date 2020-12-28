import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

function App() {
  const [result, setResult] = useState("");
  const [fiveDaysResult, setFiveDaysResult] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const city = e.target.city.value;
    makeApiCallWeatherNow(city);
    makeApiCallWeather5Days(city);
  };

  async function makeApiCallWeatherNow(city) {
    let resp = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const jsonResp = await resp.json();
    setResult(jsonResp);
  }

  async function makeApiCallWeather5Days(city) {
    let resp = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const jsonResp = await resp.json();
    const fiveDaysWeatherList = jsonResp.list;
    let fiveDaysWeather = [];
    for (let i = 0; i < 5; i++) {
      fiveDaysWeather.push(fiveDaysWeatherList[i * 8]);
    }
    setFiveDaysResult(fiveDaysWeather);
  }

  const weatherDisplay = () => {
    if (result !== "") {
      console.log(fiveDaysResult);
      const main = result.weather[0].main;
      const description = result.weather[0].description;
      return (
        <React.Fragment>
          <Grid item xs={12}>
            <p>{main}</p>
            <p>{description}</p>
          </Grid>
          <Grid item xs={12}>
            {console.log(fiveDaysResult)}
          </Grid>
        </React.Fragment>
      );
    }
  };

  return (
    <Grid
      container
      spacing={5}
      style={{ backgroundColor: "pink", flexGrow: 1, textAlign: "center" }}
    >
      <Grid item xs={12}>
        <h3>Weather</h3>
      </Grid>

      <Grid item xs={12}>
        <form onSubmit={submitHandler}>
          <TextField
            id="city"
            label="Type city"
            variant="outlined"
            name="city"
          />
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="outlined"
              style={{ margin: "0.5rem" }}
            >
              send!
            </Button>
          </Grid>
        </form>
      </Grid>
      {weatherDisplay()}
    </Grid>
  );
}

export default App;
