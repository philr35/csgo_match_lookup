import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import MenuBar from "./MenuBar";
import Heading from "./Heading";
import SearchBar from "../containers/Search_Bar";

const routes = [
  {
    path: "/",
    exact: true,
    heading: () => <Heading />,
    search: () => <SearchBar />
  }
];

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <MenuBar />
            {routes.map((route, index) =>
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.heading}
              />
            )}
            {routes.map((route, index) =>
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.search}
              />
            )}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
