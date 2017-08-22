import React, { Component } from "react";
import { Segment, Grid, Image, Progress } from "semantic-ui-react";

const resultStyle = {
  avatar: {
    padding: "4px"
  },
  segment: {
    marginTop: "0px",
    marginBottom: "7px",
    cursor: "pointer",
    borderTop: "3px solid rgba(133, 196, 250,.90)"
  },
  persona: {
    overflow: "hidden",
    padding: "10px"
  }
};

//IMPLEMENT CLICKABLE USERS (BACKEND REQUEST)
//ADD SEGMENT LOADING WHEN CLICKED
class UserDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: undefined,
      loading: false,
      disabled: false
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.renderAnimatedTop = this.renderAnimatedTop.bind(this);
  }

  handleHover(event) {
    this.setState({ color: "green" });
  }

  handleExit(event) {
    this.setState({ color: undefined });
  }

  changeLocation(event) {
    this.setState({ loading: true, disabled: true });
    setTimeout(() => {
      window.location.href = `${window.location.href}livematch/${this.props.user
        .id}`;
    }, 1000);
  }

  renderAnimatedTop() {
    if (this.state.color) {
      return (
        <Progress
          percent={100}
          attached="top"
          color={this.state.color}
          active
        />
      );
    }

    return;
  }

  render() {
    return (
      <Segment
        style={resultStyle.segment}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleExit}
        onClick={this.changeLocation}
        loading={this.state.loading}
        disabled={this.state.disabled}
      >
        {this.renderAnimatedTop()}
        <Grid>
          <Grid.Column width={3} style={resultStyle.avatar}>
            <Image
              shape="rounded"
              src={this.props.user.avatar}
              fluid
              bordered
            />
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
