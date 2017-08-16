import React, { Component } from "react";
import { Segment, Grid, Image } from "semantic-ui-react";

const resultStyle = {
  results: {
    padding: "2"
  }
};

class UserSearchResult extends Component {
  render() {
    return (
      <Segment>
        <Grid>
          <Grid.Column width={3} style={resultStyle.results}>
            <Image src={this.props.user.avatar} fluid />
          </Grid.Column>
          <Grid.Column width={9} />
          <Grid.Column width={3} />
        </Grid>
      </Segment>
    );
  }
}

export default UserSearchResult;
