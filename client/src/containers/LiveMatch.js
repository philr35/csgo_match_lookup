import _ from "lodash";
import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";

class LiveMatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.matchid,
      matchinfo: [],
      fetched: false
    };

    this.fetchMatchInfo = this.fetchMatchInfo.bind(this);

    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    this.fetchMatchInfo();
  }

  async fetchMatchInfo() {
    let matchinfoArray = [];

    let matchinfo = await axios.post("/api/current_user/matchinfo", {
      steamid: this.state.id
    });

    if (!_.isEmpty(matchinfo.data)) {
      matchinfoArray.push(matchinfo.data);
      this.setState({ matchinfo: matchinfoArray, fetched: true });
    } else {
      this.setState({ matchinfo: [], fetched: true });
    }
  }

  renderContent() {
    if (this.state.fetched) {
      if (this.state.matchinfo.length !== 0) {
        // console.log(this.state.matchinfo[0]);
        return <div>DO STUFF </div>;
      } else {
        return <div>ERROR NO MATCH FOUND </div>;
      }
    }
  }

  render() {
    return (
      <Container>
        {this.renderContent()}
      </Container>
    );
  }
}

export default LiveMatch;
