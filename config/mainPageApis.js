import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const host = "http://3.35.208.142"

export async function getBoardList(username) {
  try {
    const response = await axios({
      method: "get",
      url: host + `/main/${username}`,
    });
    // console.log(response.data.boards)
    return response.data.boards;
  } catch (err) {
    const error = err.response.data.error || err.message;
    Alert.alert(error);
  }
}

export async function createBoard(title, username) {
  try {
    const token = await AsyncStorage.getItem('session');
    // console.log(token)
    await axios({
      method: "post",
      url: host + '/api/boards',
      data: { title: title },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    // console.log(username)
  } catch (err) {
    const error = err.response.data.error || err.message;
    Alert.alert(error);
  }
}

export async function deleteBoard(boardId, navigation) {
  try {
    await axios({
      method: "delete",
      url: host + `/main/boards/${boardId}`,
    });
    navigation.push('MainPage')
    Alert.alert('보드를 삭제했습니다.')
  } catch (err) {
    const error = err.response.data.error || err.message;
    Alert.alert(error);
  }
}

