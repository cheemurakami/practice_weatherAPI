import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

export const WeatherDisplay = (props) => {
  const { result } = props;
  const [useF, setUseF] = useState(true);

  const tempConversion = (result) => {
    if (useF) {
      return Math.round(((result.main.temp - 273.15) * 9) / 5 + 32);
    } else {
      return Math.round(result.main.temp - 273.15);
    }
  };

  const showResult = () => {
    if (result) {
      return (
        <>
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
            <h1>Weather in {result.name}</h1>
            <h3>{result.weather[0].main}</h3>
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
        </>
      );
    }
  };
  return <>{showResult()}</>;
};

const mapStateToProps = (state) => {
  console.log(state.weatherResultReducer.result);
  return {
    result: state.weatherResultReducer.result,
  };
};

export default connect(mapStateToProps)(WeatherDisplay);
