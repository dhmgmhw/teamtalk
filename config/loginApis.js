import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// const host = 'http://52.79.227.130';

export async function register(name, password, skill, navigation) {
  try {
    const response = await axios({
      method: "post",
      url: host + "/signup",
      data: {
        name: name,
        password: password,
        skill: skill,
      },
    });
    if (response.data.success) {
      Alert.alert("회원가입 성공!");
      navigation.push("LoginPage");
    } else {
      Alert.alert("회원가입 실패");
    }
  } catch (err) {
    const error = err.response.data.error || err.message;
    Alert.alert(error);
  }
}
export async function signIn(name, password, navigation) {
  try {
    const response = await axios({
      method: "post",
      url: host + "/login",
      data: {
        name: name,
        password: password,
      },
    });
    const token = response.data.result.user.token;
    await AsyncStorage.setItem("session", token);
    Alert.alert("로그인 성공!");
    navigation.push("MainPage");
  } catch (err) {
    const error = err.response.data.err || err.message;
    Alert.alert(error);
  }
}

// export async function signOut(navigation) {
//   try {
//     await AsyncStorage.clear();

//     Alert.alert("로그아웃!");
//     navigation.push("LoginPage");
//   } catch (err) {
//     const error = err.response.data.error || err.message;
//     Alert.alert(error);
//   }
// }
