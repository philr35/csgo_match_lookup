import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import MenuBar from "./MenuBar";
import Heading from "./Heading";
import NoMatch from "./NoMatch";
import SearchBar from "../containers/Search_Bar";
import LiveMatch from "../containers/LiveMatch";

const routes = [
  {
    path: "/",
    exact: true,
    component: () =>
      <div>
        <Heading /> <SearchBar />
      </div>
  },
  {
    path: "/livematch/:matchid",
    exact: true,
    component: props => <LiveMatch {...props} />
  },
  {
    component: NoMatch
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
            <Switch>
              {routes.map((route, index) =>
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              )}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
