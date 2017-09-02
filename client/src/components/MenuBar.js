import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Icon, Dropdown } from "semantic-ui-react";

import RankModal from "./RankModal";
import SteamFinder from "./SteamFinder";

const menuStyle = {
  menu: {
    position: "relative",
    borderRadius: "0px"
  }
};

const rankArray = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18"
];

class MenuBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    };
  }

  componentDidMount() {
    this.requireImages();
  }

  requireImages() {
    let images = rankArray.map(rank => require(`../ranks/${rank}.png`));
    this.setState({ images: images });
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <Menu.Item href="/auth/steam" className="right">
            <Icon name="steam square" />
            Steam Login
          </Menu.Item>
        );

      default:
        return (
          <Menu.Menu position="right">
            <Dropdown item openOnFocus text="Settings">
              <Dropdown.Menu>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Inventory</Dropdown.Item>
                <Dropdown.Item>Donate</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item href="/api/logout" className="right">
              <Icon name="steam square" />
              Logout
            </Menu.Item>
          </Menu.Menu>
        );
    }
  }

  render() {
    return (
      <Menu style={menuStyle.menu}>
        <Menu.Item href="/">
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item href="/">
          <Icon name="game" />
          Live Games
        </Menu.Item>
        <SteamFinder />

        {this.renderContent()}
        <RankModal images={this.state.images} />
      </Menu>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(MenuBar);
