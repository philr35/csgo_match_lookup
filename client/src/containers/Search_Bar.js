import React, { Component } from "react";

const searchBarStyle = {
  top: "30vh",
  width: "50%",
  left: "25%",
  right: "50%"
};

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };
  }

  onInputChange(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <div>
        <form className="ui search">
          <div className="ui icon input">
            <input
              className="prompt"
              type="text"
              placeholder="Please login with steam or paste your profile URL"
              value={this.state.term}
              onChange={this.onInputChange}
            />
            <i className="search icon" />
          </div>
          <div className="results" />
        </form>
      </div>
    );
  }
}

export default SearchBar;
