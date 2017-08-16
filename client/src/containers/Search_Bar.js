import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import UserSearchResult from "../components/UserSearchResult";

const searchBarStyle = {
  form: {
    position: "relative",
    top: "25vh",
    width: "500px",
    margin: "0 auto"
  },
  input: {
    width: "500px"
  },
  segment: {
    paddingTop: "12px"
  }
};

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "", user: "" };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  async onFormSubmit(event) {
    //FIGURE OUT IF THIS CAN BE STORES AS A REDUCER
    event.preventDefault();
    //need to check if its persona, steamid, or url
    const res = await axios.post("/api/fetchuser", {
      persona: this.state.term
    });
    //auto submit form and throttle it

    //FIGURE OUT HOW TO STORE AN OBJECT ####################################
    this.setState({ user: JSON.stringify(res.data.steamInfo) });
  }

  renderResults() {
    if (this.state.user) {
      return <UserSearchResult user={JSON.parse(this.state.user)} />;
    } else {
      // send flash error that user is not in our database, please enter steamid instead
      return;
    }
  }

  renderInput() {
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
            {this.renderInput()}
            <i aria-hidden="true" className="search icon" />
          </div>
          <div className="results" style={searchBarStyle.segment}>
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
