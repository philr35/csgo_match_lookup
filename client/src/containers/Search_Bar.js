import React, { Component } from "react";
import { connect } from "react-redux";

const searchBarStyle = {
  form: {
    position: "relative",
    top: "25vh",
    width: "500px",
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

  renderContent() {
    switch (this.props.auth) {
      case null:
        break;
      case false:
        break;
      default:
        const URL = `http://steamcommunity.com/profiles/${this.props.auth
          .steamId}/`;
        if (this.state.term.length === 0) {
          this.setState({ term: URL });
        }
        break;
    }

    return (
      <input
        id="searchInput"
        style={searchBarStyle.input}
        className="inverted"
        type="text"
        placeholder="Please login with steam or paste your profile URL"
        value={this.state.term}
        onChange={this.onInputChange}
      />
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} style={searchBarStyle.form}>
          <div className="ui icon input">
            {this.renderContent()}
            <i aria-hidden="true" className="search icon" />
          </div>
          <div className="results" />
        </form>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(SearchBar);
