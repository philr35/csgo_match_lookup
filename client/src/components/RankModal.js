import React, { Component } from "react";
import { Image, Modal } from "semantic-ui-react";

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

class RankModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Modal
        dimmer="blurring"
        size="small"
        closeOnRootNodeClick={true}
        closeOnEscape={false}
        defaultOpen
      >
        <Modal.Header>Please select your current rank</Modal.Header>
        <Modal.Content>
          <Image.Group>
            {rankArray.map((rank, index) => {
              let rankSrc = require(`../ranks/${rank}.png`);
              return (
                <Image
                  src={rankSrc}
                  size="small"
                  key={rank}
                  floated="left"
                  shape="rounded"
                />
              );
            })}
          </Image.Group>
        </Modal.Content>
      </Modal>
    );
  }
}
