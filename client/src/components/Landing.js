import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import styles from "./styles/landing.css";

import SearchBar from "../containers/Search_Bar";

class LandingPage extends Component {
  render() {
    return (
      <div className={styles}>
        <Header as="h2" textAlign="center">
          Find out who's on your team
        </Header>
        <SearchBar />
      </div>
    );
  }
}

export default LandingPage;
