import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const host = 'http://3.35.208.142';

export async function register(username, password, skill, navigation) {
  try {
    await axios({
      method: "post",
      url: "http://3.36.116.168/api/test",
      data: {
        username: username,
        password: password,
        skill: skill,
      },
    });
    navigation.pop();
  } catch (err) {
    const error = err.response.data.error || err.message;
    Alert.alert(error);
  }
}


export async function postBook(avs) {
  // console.log(avs)
  fetch(
    host + '/api/test',
    {
      method: 'post',
      body: avs,
    }
  ).then(response => {
    console.log(JSON.stringify(response));
  }).catch(err => {
    console.log(err);
  });
}



export async function signIn(username, password, navigation) {
  try {
    const response = await axios({
      method: "post",
      url: host + "/api/login",
      data: {
        username: username,
        password: password,
      },
    });
    const token = response.data.token
    await AsyncStorage.setItem("session", token);
    await AsyncStorage.setItem("user", username);
    navigation.push("MainPage");
  } catch (err) {
    const error = err.response.data.err || err.message;
    Alert.alert(error);
  }
}

export async function signOut(navigation) {
  try {
    await AsyncStorage.clear();
    Alert.alert("로그아웃!");
    navigation.push("LoginPage");
  } catch (err) {
    const error = err.response.data.error || err.message;
    Alert.alert(error);
  }
}
