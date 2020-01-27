import React from "react";
import { Icon, Button, Header, Left, Right, Text, Body } from "native-base";
import { NavigationActions, withNavigation } from "react-navigation";

class CustomHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { dispatch } = this.props.navigation;
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
              onPress={() => dispatch(NavigationActions.back())}
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

//withNavigation(comp) permite que um componente use as propriedades de navegação do pai sem necessariamente receber o this.props.navigation do pai
export default withNavigation(CustomHeader);
