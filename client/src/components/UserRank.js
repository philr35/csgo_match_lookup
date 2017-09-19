import React, { Component } from "react";
import { Image, Header, Label } from "semantic-ui-react";

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

const style = {
  rank: {
    filter: "drop-shadow(black 0px 0px 1px)",
    marginTop: "7px",
    marginLeft: "4px"
  },
  noRank: {
    marginTop: "20px"
  },
  label: {
    marginLeft: "0px",
    borderRadius: "0px"
  }
};

class UserRank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rank: this.props.rank,
      rankDate: this.props.rankDate
    };
  }

  renderRank() {
    if (this.state.rank) {
      return (
        <div>
          <Image
            id="rank"
            style={style.rank}
            src={require(`../ranks_transparent/${this.state.rank}.png`)}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Header size="tiny" textAlign="center" style={style.noRank}>
            NOT RANKED
          </Header>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Label image color="blue" as="a" size="small" style={style.label}>
          {this.state.rankDate}
          <Label.Detail>
            {this.state.rank ? rankNames[this.state.rank - 1] : "None"}
          </Label.Detail>
        </Label>
        {this.renderRank()}
      </div>
    );
  }
}

export default UserRank;
