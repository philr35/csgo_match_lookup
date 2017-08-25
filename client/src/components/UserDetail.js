import React, { Component } from "react";
import {
  Segment,
  Grid,
  Image,
  Progress,
  Flag,
  Icon,
  Header
} from "semantic-ui-react";

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
    padding: "12px"
  },
  flag: {
    padding: "10px",
    transform: "scale(1.3)"
  },
  row: {
    padding: "0px"
  },
  bottomRow: {
    position: "absolute",
    bottom: "4px",
    padding: "0px",
    marginLeft: "105px"
  },
  hours: {
    paddingTop: "6.5px"
  }
};

const colorArray = [
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "blue",
  "purple",
  "violet",
  "pink",
  "brown",
  "grey"
];

class UserDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: undefined,
      loading: false,
      disabled: false,
      initialColor: ""
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.renderAnimatedTop = this.renderAnimatedTop.bind(this);
    this.renderFlag = this.renderFlag.bind(this);
    this.colorPicker = this.colorPicker.bind(this);
  }

  componentWillMount() {
    this.colorPicker();
  }

  colorPicker() {
    let color = colorArray[Math.floor(Math.random() * 11)];
    this.setState({ initialColor: color });
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

  renderFlag() {
    if (this.props.user.countryCode) {
      return (
        <Flag
          name={this.props.user.countryCode.toLowerCase()}
          style={resultStyle.flag}
        />
      );
    } else {
      return <Icon name="question" style={resultStyle.flag} />;
    }
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
          <Grid.Row style={resultStyle.row}>
            <Grid.Column width={3} style={resultStyle.avatar}>
              <Image shape="rounded" src={this.props.user.avatar} fluid />
            </Grid.Column>

            <Grid.Column width={8} style={resultStyle.persona}>
              <Grid.Row style={resultStyle.row}>
                <Header size="medium" color={this.state.initialColor} inverted>
                  {this.props.user.persona}
                </Header>
              </Grid.Row>

              <Grid.Row style={resultStyle.hours}>
                <Header size="large">
                  {Math.floor(this.props.user.minutesPlayedForever / 60) +
                    " hours played"}
                </Header>
              </Grid.Row>
            </Grid.Column>

            <Grid.Column width={5}>
              <Grid.Row>
                {this.renderFlag()}
              </Grid.Row>
            </Grid.Column>

            <Grid.Row style={resultStyle.bottomRow}>
              <a
                id="profileurl"
                target="_blank"
                rel="noopener noreferrer"
                href={this.props.user.profileUrl}
              >
                {this.props.user.profileUrl}
              </a>
            </Grid.Row>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default UserDetail;
