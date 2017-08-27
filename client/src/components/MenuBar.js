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

class MenuBar extends Component {
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
        <RankModal />
      </Menu>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(MenuBar);
