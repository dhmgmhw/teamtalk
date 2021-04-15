import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { Thumbnail } from "native-base";

const talk = require("../../assets/teamtalk.png");
const react = require("../../assets/react.png");
const reactnative = require("../../assets/reactnative.png");
const spring = require("../../assets/spring.png");
const node = require("../../assets/node.png");
const iu = require("../../assets/iu.png");
const WindowWidth = Dimensions.get("window").width;

import InputItem from "../../components/InputItem";

import { signup } from "../../config/LoginApis";

export default function SignUpPage({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [skill, setSkill] = useState("");

  let skillChoose = (d) => {
    setSkill(d);
  };

  const register = async () => {
    if (password !== passwordConfirm) {
      Alert.alert("비밀번호가 서로 일치 하지 않습니다.");
      setPasswordConfirm("");
      return false;
    } else {
      setPasswordConfirm("");
      setPassword("");
    }
    signup(name, password, skill, navigation);
  };

  const showButton = () => {
    if (name == "" || password == "" || passwordConfirm == "") {
      return (
        <TouchableOpacity disabled style={[styles.button, styles.disabled]}>
          <Text style={styles.text}>SIGN UP</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.button, styles.active]}
          onPress={() => register()}>
          <Text style={styles.text}>SIGN UP</Text>
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          alignSelf: "center",
          color: "white",
          marginBottom: 30,
          marginTop: 100,
        }}>
        크루원 정보
      </Text>
      <View style={styles.swipercontainer}>
        <SwiperFlatList autoplay autoplayDelay={3} autoplayLoop showPagination>
          <View style={[styles.child, { backgroundColor: "transparent" }]}>
            <TouchableOpacity
              onPress={async () => {
                await skillChoose(react);
                await Alert.alert("React 선택!");
              }}>
              <Thumbnail large style={styles.text} source={react} />
            </TouchableOpacity>
          </View>
          <View style={[styles.child, { backgroundColor: "transparent" }]}>
            <TouchableOpacity
              onPress={async () => {
                await skillChoose(reactnative);
                await Alert.alert("ReactNative 선택!");
              }}>
              <Thumbnail large style={styles.text} source={reactnative} />
            </TouchableOpacity>
          </View>
          <View style={[styles.child, { backgroundColor: "transparent" }]}>
            <TouchableOpacity
              onPress={async () => {
                await skillChoose(spring);
                await Alert.alert("Spring 선택!");
              }}>
              <Thumbnail large style={styles.text} source={spring} />
            </TouchableOpacity>
          </View>
          <View style={[styles.child, { backgroundColor: "transparent" }]}>
            <TouchableOpacity
              onPress={async () => {
                await skillChoose(node);
                await Alert.alert("Node.js 선택!");
              }}>
              <Thumbnail large style={styles.text} source={node} />
            </TouchableOpacity>
          </View>
        </SwiperFlatList>
      </View>
      <StatusBar style="auto" />
      <Image source={talk} resizeMode="cover" style={{ marginBottom: 30 }} />
      <View style={{ marginBottom: 80 }}>
        <InputItem hint={"이름"} value={name} setFunc={setName} />
        <InputItem
          hint={"비밀번호"}
          type={"password"}
          value={password}
          setFunc={setPassword}
        />
        <InputItem
          hint={"비밀번호 확인"}
          type={"password"}
          value={passwordConfirm}
          setFunc={setPasswordConfirm}
        />
        {showButton()}
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
  swipercontainer: {
    flex: 1,
    height: 150,
    backgroundColor: "#202540",
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  button: {
    backgroundColor: "#F2181C",
    width: 265,
    height: 40,
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.5,
  },
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
  child: {
    justifyContent: "center",
    alignItems: "center",
    width: WindowWidth,
    paddingBottom: 30,
  },
});
