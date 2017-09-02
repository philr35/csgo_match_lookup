import React, { Component } from "react";
import { Segment, Grid, Image, Flag, Icon, Header } from "semantic-ui-react";

// const rankNames = [
//   "SILVER I",
//   "SILVER II",
//   "SILVER III",
//   "SILVER IV",
//   "SILVER ELITE",
//   "SILVER ELITE MASTER",
//   "GOLD NOVA I",
//   "GOLD NOVA II",
//   "GOLD NOVA III",
//   "GOLD NOVA MASTER",
//   "MASTER GUARDIAN I",
//   "MASTER GUARDIAN II",
//   "MASTER GUARDIAN ELITE",
//   "DISTINGUISHED MASTER GUARDIAN",
//   "LEGENDARY EAGLE",
//   "LEGENDARY EAGLE MASTER",
//   "SUPREME MASTER FIRST CLASS",
//   "THE GLOBAL ELITE"
// ];

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
    zIndex: "2",
    filter: "grayscale(0.5)",
    opacity: "0.4",
    marginRight: "6px"
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
    }, 1000);
  }

  renderRank() {
    if (this.props.collectedInfo.rank) {
      return (
        <div
          style={{
            display: "table-cell",
            position: "absolute",
            minWidth: "100%"
          }}
        >
          <Image
            centered
            style={resultStyle.rank}
            src={require(`../ranks_transparent/${this.props.collectedInfo
              .rank}.png`)}
          />
        </div>
      );

      // <Header size="tiny" textAlign="center" style={resultStyle.rankText}>
      //       {rankNames[this.props.collectedInfo.rank - 1]}
      //     </Header>
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
        clearing
        style={{
          backgroundColor: this.state.hover ? "gainsboro" : "",
          ...resultStyle.segment
        }}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleExit}
        onClick={this.changeLocation}
        loading={this.state.loading}
        disabled={this.state.disabled}
        className="persona"
      >
        <Grid>
          <Grid.Row
            style={{
              ...resultStyle.row,
              margin: "2px"
            }}
          >
            <Grid.Column width={3} style={resultStyle.avatar}>
              <Image
                src={this.props.user.avatar}
                style={{ filter: "drop-shadow(0px 0px 1px black)" }}
              />
            </Grid.Column>

            <Grid.Column width={7} style={resultStyle.persona}>
              <Grid.Row style={resultStyle.row}>
                <Header
                  size="medium"
                  inverted
                  style={{
                    color: "rgb(66, 111, 158)",
                    whiteSpace: "nowrap"
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
              width={6}
              style={{
                zIndex: "1",
                padding: "0px",
                borderTopRightRadius: ".28571429rem",
                borderBottomRightRadius: ".28571429rem",
                top: "10%",
                left: "1%"
              }}
            >
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
