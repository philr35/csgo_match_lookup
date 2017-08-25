import React, { Component } from "react";
import { Modal, Button, Icon, Checkbox } from "semantic-ui-react";
import { connect } from "react-redux";

import RankImage from "./RankImage";

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

const modalStyle = {
  modal: {
    height: "600px"
  }
};

class RankModal extends Component {
  constructor(props) {
    super(props);

    this.state = { hover: false, rank: "", blurred: "" };

    this.handleRank = this.handleRank.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ blurred: "blurring" });
    }, 50);
  }

  handleRank(rank) {
    this.setState({ rank: rank });
  }

  renderRankImage() {
    return rankArray.map((rank, index) => {
      let rankSrc = require(`../ranks/${rank}.png`);
      return (
        <RankImage
          rankSrc={rankSrc}
          rank={rank}
          handleRank={this.handleRank}
          key={index}
        />
      );
    });
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return <div />;

      case false:
        return <div />;

      default:
        if (!this.props.auth.collectedInfo.rank) {
          return (
            <Modal
              style={modalStyle.modal}
              dimmer={this.state.blurred}
              size="small"
              closeOnRootNodeClick={true}
              closeOnEscape={false}
              defaultOpen
              basic
            >
              <Modal.Header>
                Please select your current rank
                <Checkbox
                  style={{
                    float: "right",
                    marginTop: "7px",
                    paddingRight: "15px"
                  }}
                  label={
                    <label style={{ color: "white" }}>I am not ranked.</label>
                  }
                />
              </Modal.Header>

              <Modal.Content>
                {this.renderRankImage()}
              </Modal.Content>
              <Modal.Actions>
                <Checkbox
                  style={{ float: "left", paddingTop: "10px" }}
                  label={
                    <label style={{ color: "white" }}>
                      I certify that this information is true, and agree to the
                      ToS
                    </label>
                  }
                />

                <Button color="green" inverted style={{ marginRight: "15px" }}>
                  <Icon name="checkmark" /> Continue ...
                </Button>
              </Modal.Actions>
            </Modal>
          );
        } else {
          return <div />;
        }
    }
  }

  render() {
    return this.renderContent();
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(RankModal);
