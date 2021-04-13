import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const host = "https://607434bc066e7e0017e794f9.mockapi.io";

export async function getBoardList() {
  try {
    const response = await axios({
      method: "get",
      url: host + "/board",
    });
    // console.log(response.data)
    return response.data;
  } catch (err) {
    const error = err.response.data.error || err.message;
    Alert.alert(error);
  }
}
