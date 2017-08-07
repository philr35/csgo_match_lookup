import React, { Component } from "react";
import { connect } from "react-redux";
import { Sidebar, Menu, Icon } from "semantic-ui-react";

const sidebarStyle = {
  position: "relative"
};

class SidebarTopOverlay extends Component {
  state = { visible: true };

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
          <Menu.Item href="/api/logout" className="right">
            <Icon name="steam square" />
            Logout
          </Menu.Item>
        );
    }
  }

  render() {
    const { visible } = this.state;

    return (
      <Sidebar
        style={sidebarStyle}
        as={Menu}
        animation="overlay"
        direction="top"
        visible={visible}
        inverted
      >
        <Menu.Item href="#">
          <Icon name="home" />
          Home
        </Menu.Item>

        {this.renderContent()}
      </Sidebar>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(SidebarTopOverlay);
