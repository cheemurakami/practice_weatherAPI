import * as a from "../actions";

import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import WeatherDisplay from "./WeatherDisplay";
import { connect } from "react-redux";

function App(props) {
  const { dispatch } = props;
  let { city } = useParams();
  let history = useHistory();

  useEffect(() => {
    if (city) {
      makeApiCallWeatherNow(city);
      makeApiCallWeather5Days(city);
    }
    return () => {};
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const inputCity = e.target.city.value;
    makeApiCallWeatherNow(inputCity);
    makeApiCallWeather5Days(inputCity);
    history.push(`/${inputCity}`);
  };

  async function makeApiCallWeatherNow(city) {
    let resp = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const jsonResp = await resp.json();
    const action = a.savedResult(jsonResp);
    dispatch(action);
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
    const action = a.savedFiveDaysResult(fiveDaysWeather);
    dispatch(action);
  }

  return (
    <Grid
      container
      spacing={5}
      style={{ backgroundColor: "pink", flex: 1, textAlign: "center" }}
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
      <WeatherDisplay />
    </Grid>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(App);
