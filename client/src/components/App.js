import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import MenuBar from "./MenuBar";
import Heading from "./Heading";
import SearchBar from "../containers/Search_Bar";
import LiveMatch from "../containers/LiveMatch";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Heading />
  },
  {
    path: "/",
    exact: true,
    component: () => <SearchBar />
  },
  {
    path: "/livematch/:matchid",
    exact: true,
    component: props => <LiveMatch {...props} />
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
                component={route.component}
              />
            )}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
