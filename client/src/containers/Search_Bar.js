import React, { Component } from "react";
import {} from "semantic-ui-react";

const searchBarStyle = {
  form: {
    position: "relative",
    top: "25vh",
    width: "540px",
    margin: "0 auto"
  },
  input: {
    width: "500px"
  }
};

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} style={searchBarStyle.form}>
          <div className="ui icon input">
            <input
              style={searchBarStyle.input}
              className="inverted"
              type="text"
              placeholder="Please login with steam or paste your profile URL"
              value={this.state.term}
              onChange={this.onInputChange}
            />
            <button className="ui icon button">
              <i aria-hidden="true" className="search icon" />
            </button>
          </div>
          <div className="results" />
        </form>
      </div>
    );
  }
}

export default SearchBar;
