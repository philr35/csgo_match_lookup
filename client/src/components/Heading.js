import React, { Component } from "react";
import { Header } from "semantic-ui-react";

const uiHeaderStyle = {
  top: "20vh",
  margin: "0",
  padding: "0",
  position: "relative"
};

class Heading extends Component {
  render() {
    return (
      <div>
        <Header as="h2" textAlign="center" style={uiHeaderStyle}>
          Find out who's on your team
        </Header>
      </div>
    );
  }
}

export default Heading;
