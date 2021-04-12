import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const talk = require("../../assets/teamtalk.png");

import ButtonItem from "../../components/ButtonItem";
import TextItem from "../../components/TextItem";
import InputItem from "../../components/InputItem";

export default function LoginPage({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={talk} resizeMode="cover" style={{ marginBottom: 30 }} />
      <InputItem hint={"이름"} value={name} setFunc={setName} />
      <InputItem
        hint={"비밀번호"}
        type={"password"}
        value={password}
        setFunc={setPassword}
      />
      <ButtonItem title={"Log In"} navigation={navigation} page={"MainPage"} />

      <View style={{ marginTop: 100 }}>
        <TextItem
          title={"Sign up"}
          navigation={navigation}
          page={"SignUpPage"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    backgroundColor: "#202540",
    alignItems: "center",
    justifyContent: "center",
  },
});
