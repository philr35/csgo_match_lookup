import React, { Component } from "react";
import { Message } from "semantic-ui-react";

class UserMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMessage: this.props.showMessage,
      warning: this.props.warning,
      visible: this.props.visible,
      persistMessage: this.props.persistMessage,
      persistWarning: this.props.persistWarning,
      bySteamId: this.props.bySteamId
    };

    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage() {
    if (
      (this.state.showMessage || this.state.warning) &&
      this.state.visible &&
      (this.state.persistMessage || this.state.persistWarning) &&
      !this.state.bySteamId
    ) {
      return (
        <Message
          info
          header={
            this.state.warning
              ? "This username was not found in our database"
              : "Not the user you're looking for?"
          }
          content={
            this.state.warning
              ? "Try entering their steam ID instead"
              : "Enter your steam ID instead."
          }
          onDismiss={this.handleDismiss}
          color="brown"
        />
      );
    } else {
      console.log("ERROR");
    }
  }

  render() {
    return (
      <div>
        {this.renderMessage()}
      </div>
    );
  }
}

export default UserMessage;
