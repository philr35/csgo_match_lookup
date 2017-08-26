import React, { Component } from "react";
import { Header } from "semantic-ui-react";

const uiHeaderStyle = {
  top: "19vh",
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
