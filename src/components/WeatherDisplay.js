import React from "react";
import { connect } from "react-redux";

export const WeatherDisplay = (props) => {
  const result = { props };
  {
    if (result) {
      return <div>Hello</div>;
    }
  }
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    result: state,
  };
};

export default connect(mapStateToProps)(WeatherDisplay);
