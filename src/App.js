import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
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
    <div className="App">
      <Container maxWidth="lg" style={{ backgroundColor: "pink" }}>
        <h4>Weather</h4>
        <form onSubmit={submitHandler}>
          <TextField
            id="city"
            label="Type city"
            variant="outlined"
            name="city"
          />
          <Button type="submit" color="primary">
            send!
          </Button>
        </form>

        <div>{console.log(result.main.temp)}</div>
      </Container>
    </div>
  );
}

export default App;
