import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

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

    this.state = { term: "", user: {} };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  async onFormSubmit(event) {
    event.preventDefault();
    const res = await axios.post("/api/fetchuser", {
      persona: this.state.term
    });
    this.setState({ user: res.data });
  }

  renderResults() {
    if (this.state.user) {
      return (
        <div>
          {JSON.stringify(this.state.user.steamInfo)}
        </div>
      );
    } else {
      return;
    }
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        break;
      case false:
        break;
      default:
        const URL = this.props.auth.steamInfo.persona;
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
        name="username"
      />
    );
  }

  render() {
    return (
      <div>
        <form
          action="/api/fetchuser"
          onSubmit={this.onFormSubmit}
          style={searchBarStyle.form}
        >
          <div className="ui icon input">
            {this.renderContent()}
            <i aria-hidden="true" className="search icon" />
          </div>
          <div className="results">
            {this.renderResults()}
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(SearchBar);
