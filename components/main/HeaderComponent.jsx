import React from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import { Header, Left, Body, Right, Button, Icon } from "native-base";
const diviceWidth = Dimensions.get("window").width;

export default function HeaderComponent({ event }) {
  return (
    <Header style={styles.body}>
      <Left></Left>
      <Body>
        <Image
          style={{ height: 35, alignSelf: "center" }}
          resizeMode="center"
          source={require("../../assets/logo.png")}
        />
      </Body>
      <Right>
        <Button transparent onPress={event}>
          <Icon name="add" style={{ color: "#F2181C", fontSize: 35 }} />
        </Button>
      </Right>
    </Header>
  );
}
const styles = StyleSheet.create({
  body: {
    paddingBottom: 10,
    backgroundColor: "#202540",
    height: 40,
  },
});
