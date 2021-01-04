import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

function App() {
  let { city } = useParams();
  let history = useHistory();
  const [result, setResult] = useState("");
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

  const tempConversion = (result) => {
    if (useF) {
      return Math.round(((result.main.temp - 273.15) * 9) / 5 + 32);
    } else {
      return Math.round(result.main.temp - 273.15);
    }
  };

  const weatherDisplay = () => {
    if (result !== "" && fiveDaysResult !== "") {
      const main = result.weather[0].main;
      const description = result.weather[0].description;

      return (
        <React.Fragment>
          <Grid
            style={{
              margin: "10px",
              padding: "10px",
              width: 500,
              borderWidth: 1,
              backgroundColor: "white",
            }}
            item
            xs={12}
          >
            <h3>{main}</h3>
            <h4>{description}</h4>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p>Temparature: {tempConversion(result)}</p>
              <Chip
                label={useF ? "F" : "C"}
                style={{ margin: "8px" }}
                onClick={() => setUseF(!useF)}
              />
            </div>
            <Button variant="outlined" style={{ margin: "0.5rem" }}>
              get link
            </Button>
          </Grid>

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
      {weatherDisplay()}
    </Grid>
  );
}

export default App;
