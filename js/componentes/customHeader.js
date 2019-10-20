import React from "react";
import { Icon, Button, Header, Left, Right, Text, Body } from "native-base";
import { NavigationActions } from "react-navigation";

export default class CustomHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Header
        androidStatusBarColor="green"
        style={{ backgroundColor: "green" }}
      >
        <Left>
          <Button large transparent>
            <Icon
              style={{
                color: Platform.OS === "ios" ? "black" : "white",
                fontSize: 40
              }}
              name="arrow-back"
              onPress={() =>
                this.props.navigation.dispatch(NavigationActions.back())
              }
            />
          </Button>
        </Left>
        <Body>
          <Text
            style={{
              color: Platform.OS === "ios" ? "black" : "white",
              width: 200,
              fontSize: 20
            }}
          >
            {this.props.titulo}
          </Text>
        </Body>
        <Right />
      </Header>
    );
  }
}
