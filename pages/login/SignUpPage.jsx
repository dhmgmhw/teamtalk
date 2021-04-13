import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { Thumbnail } from "native-base";

const talk = require("../../assets/teamtalk.png");
const iu = require("../../assets/iu.png");
const WindowWidth = Dimensions.get("window").width;

import InputItem from "../../components/InputItem";

export default function SignUpPage({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const showButton = () => {
    if (name == "" || password == "" || passwordConfirm == "") {
      return (
        <TouchableOpacity disabled style={[styles.button, styles.disabled]}>
          <Text style={styles.text}>SIGN UP</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={[styles.button, styles.active]}>
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
            <Thumbnail large style={styles.text} source={iu} />
            <Text style={styles.text}>1</Text>
          </View>
          <View style={[styles.child, { backgroundColor: "transparent" }]}>
            <Thumbnail large style={styles.text} source={iu} />
            <Text style={styles.text}>2</Text>
          </View>
          <View style={[styles.child, { backgroundColor: "transparent" }]}>
            <Thumbnail large style={styles.text} source={iu} />
            <Text style={styles.text}>3</Text>
          </View>
          <View style={[styles.child, { backgroundColor: "transparent" }]}>
            <Thumbnail large style={styles.text} source={iu} />
            <Text style={styles.text}>4</Text>
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
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
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
