import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { UserDetail } from "../components/UserDetail";

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

    this.state = {
      term: "",
      userArray: [],
      initializedInput: false,
      userNotFound: false
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  componentDidUpdate() {
    //INITIALLY SETS THE TERM VALUE AFTER LOGIN
    if (
      this.props.auth &&
      this.state.term.length === 0 &&
      !this.state.initializedInput
    ) {
      const persona = this.props.auth.steamInfo.persona;
      this.setState({ term: persona, initializedInput: true });
    }
  }

  onInputChange(event) {
    document.querySelector("#searchInput").autocomplete = "off";
    this.setState({ term: event.target.value });
  }

  async onFormSubmit(event) {
    event.preventDefault();
    let users = {};
    let userArray = [];

    if (this.state.term.length === 17 && this.state.term.match(/^[0-9]+$/)) {
      //NEED TO TRIGGER A SPINNING LOADER HERE
      users = await axios.post("/api/fetchbyuserid", {
        id: this.state.term
      });

      userArray.push(users.data[0].steamInfo);
    } else {
      users = await axios.post("/api/fetchbypersona", {
        persona: this.state.term
      });

      userArray = users.data.map(user => {
        return user.steamInfo;
      });
    }

    //IF USERARRAY IS EMPTY THEN MONGO COULDNT FIND USER THEN RESETS
    if (userArray.length === 0) {
      this.setState({ userArray: [], userNotFound: true });
    } else {
      this.setState({ userArray: userArray, userNotFound: false });
    }
  }

  renderResults() {
    if (this.state.userArray.length > 0) {
      return this.state.userArray.map((user, index) =>
        <UserDetail key={index} user={user} />
      );
    } else if (this.state.userNotFound) {
      // send flash error that user is not in our database, please enter steamid instead
      console.log("not in database");
    } else {
      return;
    }
  }

  renderInput() {
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
