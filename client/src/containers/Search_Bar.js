import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import UserDetail from "../components/UserDetail";
import { Popup } from "semantic-ui-react";

const searchBarStyle = {
  form: {
    position: "relative",
    top: "16vh",
    width: "500px",
    margin: "0 auto"
  },
  input: {
    width: "500px"
  },
  segment: {
    paddingTop: "12px"
  },
  message: {
    marginBottom: "0px"
  },
  popup: {
    opacity: "0.5"
  }
};

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
      userArraySteamInfo: [],
      userArrayCollectedInfo: [],
      initializedInput: false,
      userNotFound: false,
      bySteamId: false,
      loading: false
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
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
      this.userSearch(persona);
    }

    //fixing the input after updates
    let input = document.querySelector("#searchInput");

    var strLength = input.value.length * 2;
    input.setSelectionRange(strLength, strLength);

    input.focus();
    input.autocomplete = "off";
    input.autocorrect = "off";
    input.autocapitalize = "off";
    input.spellcheck = false;
  }

  componentWillMount() {
    //THROTTLES THE SEARCH SUBMIT
    this.delayedCallback = _.debounce(term => {
      if (term) {
        this.setState({ loading: true });
        this.userSearch(term);
      }
    }, 650);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
    this.delayedCallback(event.target.value);
  }

  async userSearch(term) {
    let userArray = [];
    let collectedInfo = [];

    if (this.state.term.length === 17 && this.state.term.match(/^[0-9]+$/)) {
      let user = await axios.post("/api/fetchbyuserid", {
        id: term
      });

      this.setState({ bySteamId: true });

      userArray.push(user.data[0].steamInfo);
      collectedInfo.push(user.data[0].collectedInfo);
    } else {
      let users = await axios.post("/api/fetchbypersona", {
        persona: term
      });

      this.setState({ bySteamId: false });

      users.data.forEach((user, index) => {
        userArray.push(user.steamInfo);
        collectedInfo.push(user.collectedInfo);
      });
    }

    //IF USERARRAY IS EMPTY THEN MONGO COULDNT FIND USER THEN RESETS
    if (userArray.length === 0) {
      this.setState({
        userArraySteamInfo: [],
        userArrayCollectedInfo: [],
        userNotFound: true
      });
    } else {
      this.setState({
        userArraySteamInfo: userArray,
        userArrayCollectedInfo: collectedInfo,
        userNotFound: false
      });
    }

    setTimeout(() => {
      this.setState({ loading: false });
    }, 350);
  }

  onFormSubmit(event) {
    event.preventDefault();
  }

  renderResults() {
    if (this.state.userArraySteamInfo.length > 0) {
      let users = this.state.userArraySteamInfo.map((user, index) => {
        return (
          <UserDetail
            key={index}
            user={user}
            collectedInfo={this.state.userArrayCollectedInfo[index]}
          />
        );
      });

      return users;
    } else if (this.state.userNotFound) {
      // SEND FLASH ERROR TO ENTER STEAMID INSTEAD
      console.log("not in database");
    } else {
      return;
    }
  }

  renderInput() {
    const input = (
      <input
        id="searchInput"
        style={searchBarStyle.input}
        type="text"
        placeholder="Search up live CSGO matches"
        value={this.state.term}
        onChange={this.onInputChange}
        name="username"
      />
    );
    if (this.state.term) {
      return input;
    } else {
      return (
        <Popup
          inverted
          trigger={input}
          style={searchBarStyle.popup}
          wide
          size="mini"
          content="Enter a username, steam ID, or profile URL"
          on="focus"
        />
      );
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} style={searchBarStyle.form}>
          <div
            className={
              this.state.loading ? "ui icon input loading" : "ui icon input"
            }
          >
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
