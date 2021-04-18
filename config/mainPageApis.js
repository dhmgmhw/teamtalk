import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const host = "http://3.35.208.142"

export async function getBoardList() {
  try {
    const response = await axios({
      method: "get",
      url: host + "/api",
    });
    // console.log(response.data)
    return response.data;
  } catch (err) {
    const error = err.response.data.error || err.message;
    Alert.alert(error);
  }
}

export async function createBoard(title) {
  try {
    await axios.post(host + "/api/boards", {
      title: title,
    });
    // console.log(title)
  } catch (err) {
    const error = err.response.data.error || err.message;
    Alert.alert(error);
  }
}

export async function deleteBoard(boardId, navigation) {
  try {
    await axios({
      method: "delete",
      url: host + "/api/boards/" + boardId,
    });
    navigation.push('MainPage')
    Alert.alert('보드를 삭제했습니다.')
  } catch (err) {
    const error = err.response.data.error || err.message;
    Alert.alert(error);
  }
}

