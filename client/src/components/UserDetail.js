import React, { Component } from "react";
import {
  Segment,
  Grid,
  Image,
  Flag,
  Icon,
  Header,
  Label
} from "semantic-ui-react";

const rankNames = [
  "S1",
  "S2",
  "S3",
  "S4",
  "SE",
  "SEM",
  "GN1",
  "GN2",
  "GN3",
  "GNM",
  "MG1",
  "MG2",
  "MGE",
  "DMG",
  "LE",
  "LEM",
  "SUPREME",
  "GLOBAL"
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
    cursor: "pointer",
    border: "0px solid white",
    boxShadow: "0 0 8px black",
    overflow: "hidden",
    borderRight: "6px solid grey"
  },
  persona: {
    overflow: "hidden",
    padding: "10px"
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
    filter: "drop-shadow(black 0px 0px 1px)",
    marginTop: "7px",
    marginLeft: "4px"
  },
  rankText: {
    margin: "25px 0px 0px",
    color: "white",
    zIndex: "3",
    textAlign: "center",
    textRendering: "optimizeLegibility",
    backgroundColor: "black",
    opacity: "0.4"
  }
};

class UserDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      disabled: false,
      hover: false,
      hoverA: false
    };

    this.handleHover = this.handleHover.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.renderFlag = this.renderFlag.bind(this);
    this.renderRank = this.renderRank.bind(this);
    this.handlePropagation = this.handlePropagation.bind(this);
    this.handleHoverAnchor = this.handleHoverAnchor.bind(this);
    this.handleExitAnchor = this.handleExitAnchor.bind(this);
  }

  componentDidMount() {
    let personas = document.querySelectorAll(".persona");

    personas.forEach(persona => {
      persona.style.borderRight = `6px solid rgb(
        ${Math.floor(Math.random() * 240)},
        ${Math.floor(Math.random() * 240)},
        ${Math.floor(Math.random() * 240)}
      )`;
    });
  }

  handlePropagation(event) {
    event.stopPropagation();
  }

  handleHoverAnchor(event) {
    this.setState({ hoverA: true });
  }

  handleExitAnchor(event) {
    this.setState({ hoverA: false });
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
    }, 500);
  }

  renderRank() {
    if (this.props.collectedInfo.rank) {
      return (
        <div>
          <Image
            id="rank"
            style={{
              ...resultStyle.rank
            }}
            src={require(`../ranks_transparent/${this.props.collectedInfo
              .rank}.png`)}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Header
            size="tiny"
            textAlign="center"
            style={{
              ...resultStyle.rankText,
              opacity: !this.state.opacity ? "1" : "0.4"
            }}
          >
            NOT RANKED
          </Header>
        </div>
      );
    }
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
        style={{
          backgroundColor: this.state.hover ? "rgb(237, 237, 237)" : "",
          ...resultStyle.segment
        }}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleExit}
        onClick={this.changeLocation}
        loading={this.state.loading}
        disabled={this.state.disabled}
        className="persona"
      >
        <Grid divided>
          <Grid.Row
            style={{
              ...resultStyle.row,
              margin: "6px"
            }}
          >
            <Grid.Column width={3} style={resultStyle.avatar}>
              <Image
                src={this.props.user.avatar}
                style={{ filter: "drop-shadow(0px 0px 1px black)" }}
              />
            </Grid.Column>

            <Grid.Column width={8} style={resultStyle.persona}>
              <Grid.Row style={resultStyle.row}>
                <Header
                  size="medium"
                  inverted
                  style={{
                    color: "rgb(66, 111, 158)",
                    whiteSpace: "nowrap",
                    marginRight: "14px",
                    overflow: "hidden"
                  }}
                >
                  {this.props.user.persona}
                </Header>
              </Grid.Row>

              <Grid.Row style={resultStyle.hours}>
                <Header size="large" style={{ whiteSpace: "nowrap" }}>
                  {Math.floor(this.props.user.minutesPlayedForever / 60) +
                    " hours played"}
                </Header>
              </Grid.Row>
            </Grid.Column>

            <Grid.Column
              width={5}
              style={{
                zIndex: "1",
                padding: "0px",
                borderTopRightRadius: ".28571429rem",
                borderBottomRightRadius: ".28571429rem"
              }}
            >
              <Label
                image
                color="blue"
                as="a"
                size="small"
                style={{ marginLeft: "0px", borderRadius: "0px" }}
              >
                9/3/2017
                <Label.Detail>
                  {this.props.collectedInfo.rank
                    ? rankNames[this.props.collectedInfo.rank - 1]
                    : "None"}
                </Label.Detail>
              </Label>
              {this.renderRank()}
            </Grid.Column>

            <Grid.Row style={resultStyle.bottomRow}>
              <a
                style={{ color: this.state.hoverA ? "red" : "blue" }}
                id="profileurl"
                target="_blank"
                rel="noopener noreferrer"
                href={this.props.user.profileUrl}
                onClick={this.handlePropagation}
                onMouseEnter={this.handleHoverAnchor}
                onMouseLeave={this.handleExitAnchor}
              >
                Steam Community Profile
              </a>
              {this.renderFlag()}
            </Grid.Row>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default UserDetail;
