import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];

export const FiveDaysDisplay = (props) => {
  const { fiveDaysResult } = props;
  const [useF] = useState(true);

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

  const showFiveDaysResult = () => {
    if (fiveDaysResult) {
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

  return <>{showFiveDaysResult()}</>;
};

const mapStateToProps = (state) => {
  return {
    fiveDaysResult: state.weatherResultReducer.fiveDaysResult,
  };
};

export default connect(mapStateToProps)(FiveDaysDisplay);
