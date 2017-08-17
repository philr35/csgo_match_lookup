import React from "react";
import { Segment, Grid, Image } from "semantic-ui-react";

const resultStyle = {
  avatar: {
    padding: "2px"
  },
  segment: {
    marginTop: "0px",
    marginBottom: "7px",
    cursor: "pointer"
  },
  persona: {
    overflow: "hidden",
    padding: "10px"
  }
  
};

//IMPLEMENT HOVER EFFECT
//onmouseenter / onmouseleave
//IMPLEMENT CLICKABLE USERS (BACKEND REQUEST)
//CHANGE BACK TO EXTENDS COMPONENT
export const UserDetail = props => {
  return (
    <Segment style={resultStyle.segment}>
      <Grid>
        <Grid.Column width={3} style={resultStyle.avatar}>
          <Image src={props.user.avatar} fluid />
        </Grid.Column>
        <Grid.Column width={9} style={resultStyle.persona}>
          <h2 className="ui header">{props.user.persona}</h2>
        </Grid.Column>
        <Grid.Column width={3} />
      </Grid>
    </Segment>
  );
};

