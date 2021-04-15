import React from "react";
import { StyleSheet } from "react-native";
import { Item, Input, Text } from "native-base";

export default function InputItem({ hint, type, value, setFunc }) {
  return (
    <>
      <Item
        regular
        style={{
          alignSelf: "center",
          borderRadius: 15,
          marginBottom: 20,
          width: 265,
          backgroundColor: "white",
        }}>
        <Input
          style={styles.input}
          //type이 패스워드면 화면상에 텍스트가 안보이게 처리하는 속성
          secureTextEntry={type == "password" ? true : false}
          placeholder={hint}
          value={value}
          onChangeText={(text) => {
            setFunc(text);
          }}
        />
      </Item>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  input: {
    alignSelf: "center",
  },
});
