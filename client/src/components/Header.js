import React, { Component } from "react";
import { Sidebar, Menu } from "semantic-ui-react";
import styles from "./styles/header.css";

class SidebarTopOverlay extends Component {
  state = { visible: true };

  render() {
    const { visible } = this.state;
    return (
      <div className={styles}>
        <Sidebar
          as={Menu}
          animation="overlay"
          direction="top"
          visible={visible}
          inverted
        >
          <a className="item">
            <i className="home icon" />
            Home
          </a>
          <a className="item right">
            <i className="steam square icon" />
            Steam Login
          </a>
        </Sidebar>
      </div>
    );
  }
}

export default SidebarTopOverlay;
