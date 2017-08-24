import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Icon, Dropdown, Modal, TextArea, Form } from "semantic-ui-react";

const menuStyle = {
  position: "relative",
  borderRadius: "0px"
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

  renderSteamFinder() {}

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
        <Modal trigger={<Menu.Item>SteamId Finder</Menu.Item>} size="tiny">
          <Modal.Content>
            <Form>
              <label>Your Steam ID:</label>
              <TextArea
                autoHeight
                value="52852362346359259"
                rows={1}
                onChange={e => {
                  e.preventDefault();
                }}
              />
            </Form>
          </Modal.Content>
        </Modal>

        {this.renderContent()}
      </Menu>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(MenuBar);
