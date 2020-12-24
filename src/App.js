import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";

function App() {
  const submitHandler = (e) => {
    e.preventDefault();
    const city = e.target.city.value;
    console.log(city);
  };

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
      </Container>
    </div>
  );
}

export default App;
