import * as a from "../actions";

import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import WeatherDisplay from "./WeatherDisplay";
import { connect } from "react-redux";

const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];

function App(props) {
  const { dispatch, result } = props;
  let { city } = useParams();
  let history = useHistory();
  const [fiveDaysResult, setFiveDaysResult] = useState("");
  const [useF, setUseF] = useState(true);

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
    setFiveDaysResult(fiveDaysWeather);
  }

  const tempConversion = (result) => {
    if (useF) {
      return Math.round(((result.main.temp - 273.15) * 9) / 5 + 32);
    } else {
      return Math.round(result.main.temp - 273.15);
    }
  };

  const showDay = (dt) => {
    return days[new Date(dt).getDay()];
  };

  const weatherDisplay = () => {
    if (result !== "" && fiveDaysResult !== "") {
      console.log(fiveDaysResult);
      return (
        <React.Fragment>
          <Grid
            style={{
              width: "100%",
            }}
          >
            <h4>5 days forecast</h4>
            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {fiveDaysResult.map((result, index) => {
                return (
                  <Grid
                    key={index}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "10px",
                      padding: "10px",
                    }}
                  >
                    <Grid item xs={12}>
                      {result.dt_txt.split(" ")[0]}
                    </Grid>
                    <Grid item xs={12}>
                      {showDay(result.dt_txt.split(" ")[0])}
                    </Grid>
                    <Grid item xs={12}>
                      {result.weather[0].description}
                    </Grid>
                    <Grid item xs={12}>
                      {tempConversion(result)}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
  };

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
      {/* {weatherDisplay()} */}
    </Grid>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(App);
