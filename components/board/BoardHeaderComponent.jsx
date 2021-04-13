import React from "react";
import { StyleSheet, Dimensions, Image, Text } from "react-native";
import { Header, Left, Body, Right, Button, Icon } from "native-base";
const diviceWidth = Dimensions.get("window").width;

export default function BoardHeaderComponent({ navigation, title }) {
  return (
    <Header style={styles.body}>
      <Left>
        <Button
          transparent
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="chevron-back-sharp"
            style={{ color: "white", fontSize: 35, marginTop: 12 }}
          />
        </Button>
      </Left>
      <Body>
        <Text ellipsizeMode={"tail"} numberOfLines={1} style={styles.groupName}>
          {title}
        </Text>
      </Body>
      <Right>
        <Button
          transparent
          onPress={() => {
            console.log("참가인원");
          }}>
          <Icon
            name="people-sharp"
            style={{ color: "white", fontSize: 30, top: 2 }}
          />
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
  groupName: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
    top: 3,
    alignSelf: "center",
    marginLeft: 40,
  },
});
