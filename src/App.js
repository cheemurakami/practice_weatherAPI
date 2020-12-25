import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

function App() {
  const [result, setResult] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const city = e.target.city.value;
    makeApiCall(city);
  };

  async function makeApiCall(city) {
    let resp = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&code=US-OR`
    );
    const jsonResp = await resp.json();
    setResult(jsonResp);
  }

  return (
    <Grid
      container
      spacing={5}
      style={{ backgroundColor: "pink", flexGrow: 1, textAlign: "center" }}
    >
      <Grid item xs={12}>
        <h4>Weather</h4>
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

      <div>{console.log(result)}</div>
    </Grid>
  );
}

export default App;
