import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "native-base";

export default function TextButton({ title, navigation, page }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push(page);
      }}>
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textButton: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
