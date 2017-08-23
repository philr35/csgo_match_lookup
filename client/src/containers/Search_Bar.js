import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import UserDetail from "../components/UserDetail";
import { Message, Popup } from "semantic-ui-react";

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
  },
  message: {
    marginBottom: "0px"
  }
};

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
      userArray: [],
      initializedInput: false,
      userNotFound: false,
      showMessage: false,
      persistMessage: true,
      visible: true,
      warning: false,
      persistWarning: true
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.userSearch = this.userSearch.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
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
  }

  componentWillMount() {
    //THROTTLES THE SEARCH SUBMIT
    this.delayedCallback = _.debounce(term => {
      if (term) {
        this.toggleLoading(true);
        this.userSearch(term);
      }
    }, 650);
  }

  toggleLoading(toggle) {
    if (toggle) {
      document.querySelector(".ui.icon.input").className += " loading";
    } else {
      document.querySelector(".ui.icon.input").classList.remove("loading");
    }
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
    this.delayedCallback(event.target.value);
  }

  async userSearch(term) {
    let userArray = [];

    if (this.state.term.length === 17 && this.state.term.match(/^[0-9]+$/)) {
      let users = await axios.post("/api/fetchbyuserid", {
        id: term
      });

      userArray.push(users.data[0].steamInfo);
    } else {
      let users = await axios.post("/api/fetchbypersona", {
        persona: term
      });

      userArray = users.data.map(user => {
        return user.steamInfo;
      });

      if (userArray.length > 0) {
        setTimeout(() => {
          this.setState({ showMessage: true });
        }, 7000);
      } else {
        this.setState({ warning: true });
      }
    }

    //IF USERARRAY IS EMPTY THEN MONGO COULDNT FIND USER THEN RESETS
    if (userArray.length === 0) {
      this.setState({ userArray: [], userNotFound: true });
    } else {
      this.setState({
        userArray: userArray,
        userNotFound: false
      });
    }

    setTimeout(() => {
      this.toggleLoading(false);
    }, 350);
  }

  onFormSubmit(event) {
    event.preventDefault();
  }

  handleDismiss = () => {
    this.setState({
      visible: false,
      persistMessage: false
    });
  };

  renderResults() {
    if (this.state.userArray.length > 0) {
      return this.state.userArray.map((user, index) =>
        <UserDetail key={index} user={user} />
      );
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
        className="inverted"
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
          trigger={input}
          wide
          size="mini"
          content="Enter a username, steam ID, or profile URL"
          on="focus"
        />
      );
    }
  }

  renderMessage() {
    if (
      this.state.showMessage &&
      this.state.visible &&
      (this.state.persistMessage || this.state.persistWarning)
    ) {
      return (
        <Message
          info
          style={searchBarStyle.message}
          header={
            this.state.warning
              ? "This username was not found in our database"
              : "Not the user you're looking for?"
          }
          content={
            this.state.warning
              ? "Try entering their steam ID instead"
              : "Enter your steam ID instead."
          }
          onDismiss={this.handleDismiss}
          warning={this.state.warning}
        />
      );
    }
    return;
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
          {this.renderMessage()}
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
