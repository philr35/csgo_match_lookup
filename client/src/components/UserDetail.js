import React, { Component } from "react";
import { Segment, Grid, Image } from "semantic-ui-react";

import UserPersona from "./UserPersona";
import UserRank from "./UserRank";

const resultStyle = {
  row: {
    padding: "0px",
    margin: "6px"
  },
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
  personaCol: {
    overflow: "hidden"
  },
  rankCol: {
    zIndex: "1",
    padding: "0px",
    borderTopRightRadius: ".28571429rem",
    borderBottomRightRadius: ".28571429rem"
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
    return (
      <UserRank
        rank={this.props.collectedInfo.rank}
        rankDate={this.props.collectedInfo.rankDate}
      />
    );
  }

  renderPersona() {
    return (
      <UserPersona
        persona={this.props.user.persona}
        playtime={this.props.user.minutesPlayedForever}
      />
    );
  }

  renderAvatar() {
    return (
      <Image
        src={this.props.user.avatar}
        style={{ filter: "drop-shadow(0px 0px 1px black)" }}
      />
    );
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
          <Grid.Row style={resultStyle.row}>
            <Grid.Column width={3} style={resultStyle.avatar}>
              {this.renderAvatar()}
            </Grid.Column>

            <Grid.Column width={8} style={resultStyle.personaCol}>
              {this.renderPersona()}
            </Grid.Column>
            <Grid.Column width={5} style={resultStyle.rankCol}>
              {this.renderRank()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default UserDetail;

// <Grid.Row style={resultStyle.bottomRow}>
//               <a
//                 style={{ color: this.state.hoverA ? "red" : "blue" }}
//                 id="profileurl"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 href={this.props.user.profileUrl}
//                 onClick={this.handlePropagation}
//                 onMouseEnter={this.handleHoverAnchor}
//                 onMouseLeave={this.handleExitAnchor}
//               >
//                 Steam Community Profile
//               </a>
//               {this.renderFlag()}
//             </Grid.Row>

// renderFlag() {
//   if (this.props.user.countryCode) {
//     return (
//       <Flag
//         name={this.props.user.countryCode.toLowerCase()}
//         style={resultStyle.flag}
//       />
//     );
//   } else {
//     return <Icon name="question" style={resultStyle.flag} />;
//   }
// }
