import React, { Component } from "react";
import { Segment, Grid, Image } from "semantic-ui-react";

const resultStyle = {
  results: {
    padding: "2px"
  },
  segment: {
    marginTop: "0px",
    marginBottom: "7px"
  }
};

export const UserDetail = props => {
  return (
    <Segment style={resultStyle.segment}>
      <Grid>
        <Grid.Column width={3} style={resultStyle.results}>
          <Image src={props.user.avatar} fluid />
        </Grid.Column>
        <Grid.Column width={9} />
        <Grid.Column width={3} />
      </Grid>
    </Segment>
  );
};

