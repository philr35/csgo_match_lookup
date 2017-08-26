import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Menu, Input, Label, Popup } from "semantic-ui-react";
import CopyToClipboard from "react-copy-to-clipboard";

class SteamFinder extends Component {
  handleClick() {
    document.querySelector("#clipboard").click();
  }

  label() {
    const label = (
      <Label color="blue" as="a" onClick={this.handleClick}>
        Copy
      </Label>
    );

    return (
      <Popup
        trigger={label}
        content="Copied to clipboard!"
        on="click"
        size="mini"
        position="top right"
        offset={-40}
        inverted
      />
    );
  }

  renderContent() {
    if (this.props.auth) {
      return (
        <Modal
          trigger={<Menu.Item>SteamId Finder</Menu.Item>}
          size="tiny"
          closeIcon="close"
          style={{ marginTop: "-300px" }}
        >
          <Modal.Content>
            <Label color="blue" attached="top left">
              Steam ID:
            </Label>

            <Input
              fluid
              id="steam"
              labelPosition="right"
              label={this.label()}
              defaultValue={this.props.auth.steamInfo.id}
            />

            <CopyToClipboard
              id="clipboard"
              text={this.props.auth.steamInfo.id}
              style={{ display: "none" }}
            >
              <span>Copy to clipboard with span</span>
            </CopyToClipboard>
          </Modal.Content>
        </Modal>
      );
    } else {
      return <Menu.Item>SteamId Finder</Menu.Item>;
    }
  }

  render() {
    return this.renderContent();
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(SteamFinder);
