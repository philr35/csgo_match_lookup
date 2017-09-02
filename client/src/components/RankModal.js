import React, { Component } from "react";
import { Modal, Button, Icon, Checkbox } from "semantic-ui-react";
import { connect } from "react-redux";

import axios from "axios";

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

    this.state = {
      modalOpen: true,
      rankPicked: false,
      checkedTos: false,
      checkedUnranked: false,
      currentClickedRank: ""
    };

    this.handleRankClick = this.handleRankClick.bind(this);
    this.handleCheckedTos = this.handleCheckedTos.bind(this);
    this.handleCheckedUnranked = this.handleCheckedUnranked.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentDidMount() {
    this.setState({ checkedTos: true });
    setTimeout(() => {
      document.body.style.paddingBottom = "1px";
    }, 300);
  }

  async buttonClick() {
    if (
      !!(this.state.rankPicked ^ this.state.checkedUnranked) &&
      this.state.checkedTos
    ) {
      await axios.post("/api/updaterank", {
        id: this.props.auth.steamInfo.id,
        rank: this.state.currentClickedRank
      });
      this.setState({ modalOpen: false });
    }
  }

  handleCheckedTos() {
    if (this.state.checkedTos) {
      this.setState({ checkedTos: false });
    } else {
      this.setState({ checkedTos: true });
    }
  }

  handleCheckedUnranked() {
    if (this.state.checkedUnranked) {
      this.setState({ checkedUnranked: false });
    } else {
      this.setState({ checkedUnranked: true });
    }
  }

  handleRankClick(rank) {
    rankArray.forEach(rankcheck => {
      if (rank !== rankcheck) {
        document.querySelector(`#rank${rankcheck}`).style.cssText +=
          "filter: grayscale(1); transform: none;";
      } else {
        if (this.state.currentClickedRank === rankcheck) {
          document.querySelector(`#rank${rankcheck}`).style.cssText +=
            "transform: none; filter: grayscale(1);";
          this.setState({ currentClickedRank: "", rankPicked: false });
        } else {
          document.querySelector(`#rank${rankcheck}`).style.cssText +=
            "transform: scale(1.5); filter: none;";
          this.setState({ currentClickedRank: rankcheck, rankPicked: true });
        }
      }
    });
  }

  renderRankImage() {
    return rankArray.map((rank, index) => {
      return (
        <RankImage
          rankSrc={this.props.images[index]}
          rank={rank}
          handleRank={this.handleRankClick}
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
              dimmer="blurring"
              size="small"
              closeOnRootNodeClick={false}
              closeOnEscape={false}
              open={this.state.modalOpen}
              basic
            >
              <Modal.Header>
                Please select your current rank
                <Checkbox
                  checked={this.state.checkedUnranked}
                  onChange={this.handleCheckedUnranked}
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
                  checked={this.state.checkedTos}
                  onChange={this.handleCheckedTos}
                  style={{ float: "left", paddingTop: "10px" }}
                  label={
                    <label style={{ color: "white" }}>
                      I certify that this information is true, and agree to the
                      ToS
                    </label>
                  }
                />

                <Button
                  onClick={this.buttonClick}
                  color="green"
                  inverted
                  style={{ marginRight: "15px" }}
                >
                  <Icon name="checkmark" /> Continue
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
