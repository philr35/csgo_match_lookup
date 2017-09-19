import React, { Component } from "react";
import { Grid, Header, Icon, Label } from "semantic-ui-react";

class UserPersona extends Component {
  constructor(props) {
    super(props);

    this.state = {
      persona: this.props.persona,
      playtime: this.props.playtime
    };
  }

  render() {
    return (
      <Grid style={{ marginTop: "0px" }}>
        <Grid.Row style={{ padding: "0px", paddingTop: "10px" }}>
          <Grid.Column
            width={11}
            style={{ padding: "0px", paddingLeft: "10px" }}
          >
            <Header
              size="medium"
              inverted
              style={{
                color: "rgb(66, 111, 158)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                marginRight: "4px"
              }}
            >
              {this.state.persona}
            </Header>
          </Grid.Column>
          <Grid.Column width={4} style={{ padding: "0px" }}>
            <Header
              floated="left"
              size="tiny"
              style={{
                whiteSpace: "nowrap",
                padding: "0px",
                paddingTop: "2px"
              }}
            >
              <Icon
                name="time"
                style={{ transform: "scale(.7)", margin: "0px" }}
              />
              {Math.floor(this.state.playtime / 60) + "h"}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Label as="a" color="blue">
            <Icon name="plus" />
            Rep
            <Label.Detail color="blue">57</Label.Detail>
          </Label>
        </Grid.Row>
      </Grid>
    );
  }
}

export default UserPersona;
