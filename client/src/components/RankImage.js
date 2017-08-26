import React, { Component } from "react";
import { Image } from "semantic-ui-react";

const imageStyle = {
  hover: {
    margin: "1em",
    transform: "scale(1.5)",
    cursor: "pointer"
  },
  noHover: {
    margin: "1em",
    cursor: "pointer"
  }
};

class RankImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rank: this.props.rank,
      hover: false,
      clicked: false
    };

    this.handleExit = this.handleExit.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({ clicked: true });
    this.props.handleRank(this.state.rank);
  }

  handleHover(event) {
    this.setState({ hover: true });
  }

  handleExit(event) {
    if (!this.state.clicked) {
      this.setState({ hover: false });
    }
  }

  handleDrag(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Image
        src={this.props.rankSrc}
        id={"rank" + this.state.rank}
        size="tiny"
        inline
        shape="rounded"
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleExit}
        onClick={this.handleClick}
        onDragStart={this.handleDrag}
        style={this.state.hover ? imageStyle.hover : imageStyle.noHover}
        spaced
      />
    );
  }
}

export default RankImage;
