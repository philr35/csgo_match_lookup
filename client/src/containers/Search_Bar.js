import React, { Component } from "react";
import styles from "./styles/search_bar.css";

class SearchBar extends Component {
  render() {
    return (
      <div className={styles}>
        <div className="ui loading search">
          <div className="ui icon input">
            <input
              className="prompt"
              type="text"
              placeholder="Please login with steam or paste your profile URL"
            />
            <i className="search icon" />
          </div>
          <div className="results" />
        </div>
      </div>
    );
  }
}

export default SearchBar;
