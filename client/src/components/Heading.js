import React, { Component } from "react";
import { Header } from "semantic-ui-react";

const uiHeaderStyle = {
  top: "12vh",
  position: "relative"
};

class Heading extends Component {
  render() {
    return (
      <Header as="h2" textAlign="center" style={uiHeaderStyle} inverted>
        Find out who's on your team
      </Header>
    );
  }
}

export default Heading;
