import React, { Component } from "react";
import { Segment, Grid, Image } from "semantic-ui-react";

const resultStyle = {
  avatar: {
    padding: "4px"
  },
  segment: {
    marginTop: "0px",
    marginBottom: "7px",
    cursor: "pointer"
  },
  persona: {
    overflow: "hidden",
    padding: "10px"
  }
};

//IMPLEMENT HOVER EFFECT
//onmouseenter / onmouseleave//IMPLEMENT CLICKABLE USERS (BACKEND REQUEST)
//CHANGE BACK TO EXTENDS COMPONENT
//ADD COLOR TEAL WHEN HOVER
//ADD SEGMENT LOADING WHEN CLICKED
class UserDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: undefined
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleHover(event) {
    this.setState({ color: "yellow" });
  }

  handleExit(event) {
    this.setState({ color: undefined });
  }

  render() {
    return (
      <Segment
        id="segment"
        style={resultStyle.segment}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleExit}
        color={this.state.color}
      >
        <Grid>
          <Grid.Column width={3} style={resultStyle.avatar}>
            <Image shape="rounded" src={this.props.user.avatar} fluid />
          </Grid.Column>
          <Grid.Column width={9} style={resultStyle.persona}>
            <h3 className="ui header">
              {this.props.user.persona}
            </h3>
          </Grid.Column>
          <Grid.Column width={3} />
        </Grid>
      </Segment>
    );
  }
}

export default UserDetail;
