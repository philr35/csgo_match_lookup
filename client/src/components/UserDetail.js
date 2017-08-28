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

const rankNames = [
  "SILVER I",
  "SILVER II",
  "SILVER III",
  "SILVER IV",
  "SILVER ELITE",
  "SILVER ELITE MASTER",
  "GOLD NOVA I",
  "GOLD NOVA II",
  "GOLD NOVA III",
  "GOLD NOVA MASTER",
  "MASTER GUARDIAN I",
  "MASTER GUARDIAN II",
  "MASTER GUARDIAN ELITE",
  "DISTINGUISHED MASTER GUARDIAN",
  "LEGENDARY EAGLE",
  "LEGENDARY EAGLE MASTER",
  "SUPREME MASTER FIRST CLASS",
  "THE GLOBAL ELITE"
];

const resultStyle = {
  avatar: {
    padding: "10px",
    borderBottomLeftRadius: ".28571429rem",
    borderTopLeftRadius: ".28571429rem"
  },
  segment: {
    marginTop: "0px",
    marginBottom: "7px",
    cursor: "pointer"
  },
  persona: {
    overflow: "hidden",
    padding: "12px"
  },
  flag: {
    paddingLeft: "10px"
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
  },
  rank: {
    transform: "scale(0.7)",
    marginTop: "8px"
  },
  rankText: {
    margin: "0px",
    fontSize: "0.9em"
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
      loading: false,
      disabled: false,
      initialColor: "",
      hover: false
    };

    this.handleHover = this.handleHover.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.renderAnimatedTop = this.renderAnimatedTop.bind(this);
    this.renderFlag = this.renderFlag.bind(this);
    this.colorPicker = this.colorPicker.bind(this);
    this.renderRank = this.renderRank.bind(this);
  }

  componentWillMount() {
    this.colorPicker();
  }

  colorPicker() {
    let color = colorArray[Math.floor(Math.random() * 11)];
    this.setState({ initialColor: color });
  }

  handleHover(event) {
    this.setState({ hover: true });
  }

  handleExit(event) {
    this.setState({ hover: false });
  }

  changeLocation(event) {
    this.setState({ loading: true, disabled: true });
    setTimeout(() => {
      window.location.href = `${window.location.href}livematch/${this.props.user
        .id}`;
    }, 1000);
  }

  renderRank() {
    if (this.props.collectedInfo.rank) {
      return (
        <div>
          <Image
            style={resultStyle.rank}
            src={require(`../ranks/${this.props.collectedInfo.rank}.png`)}
          />
          <Header size="tiny" textAlign="center" style={resultStyle.rankText}>
            {rankNames[this.props.collectedInfo.rank - 1]}
          </Header>
        </div>
      );
    } else {
      return (
        <div>
          <Header size="tiny" textAlign="center" style={resultStyle.rankText}>
            NOT RANKED
          </Header>
        </div>
      );
    }
  }

  renderAnimatedTop() {
    if (this.state.color) {
      return (
        <Progress
          percent={100}
          attached="right"
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
    if (this.state.hover) {
      resultStyle.segment.background = "whitesmoke";
    } else {
      resultStyle.segment.background = "";
    }

    return (
      <Segment
        style={resultStyle.segment}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleExit}
        onClick={this.changeLocation}
        loading={this.state.loading}
        disabled={this.state.disabled}
        className="persona"
      >
        <Grid divided>
          <Grid.Row style={resultStyle.row}>
            <Grid.Column width={3} style={resultStyle.avatar}>
              <Image
                src={this.props.user.avatar}
                style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)" }}
              />
            </Grid.Column>

            <Grid.Column width={8} style={resultStyle.persona}>
              <Grid.Row style={resultStyle.row}>
                <Header size="medium" color={this.state.initialColor} inverted>
                  {this.props.user.persona}
                  {this.renderFlag()}
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
                {this.renderRank()}
              </Grid.Row>
            </Grid.Column>

            <Grid.Row style={resultStyle.bottomRow}>
              <a
                id="profileurl"
                target="_blank"
                rel="noopener noreferrer"
                href={this.props.user.profileUrl}
              >
                Steam Community Profile
              </a>
            </Grid.Row>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default UserDetail;
