import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "native-base";

export default function ButtonItem({ title, navigation, page, show }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate(page);
        show();
      }}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F2181C",
    width: 265,
    height: 40,
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
