import React, { Component } from "react";
import { connect } from "react-redux";
import { Sidebar, Menu, Icon, Dropdown } from "semantic-ui-react";

const menuStyle = {
  position: "relative",
  borderRadius: "0px"
};

const options = [
  { key: 1, text: "Choice 1", value: 1 },
  { key: 2, text: "Choice 2", value: 2 },
  { key: 3, text: "Choice 3", value: 3 }
];

class MenuBar extends Component {
  constructor(props) {
    super(props);
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
      <Menu inverted style={menuStyle}>
        <Menu.Item href="/">
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item href="/">
          <Icon name="game" />
          Live Games
        </Menu.Item>
        <Menu.Item href="/">SteamID Finder</Menu.Item>

        {this.renderContent()}
      </Menu>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(MenuBar);
