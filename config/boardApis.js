import { Alert } from "react-native";
import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const host = "http://3.35.208.142"

export async function getPins() {
    try {
        const response = await axios({
            method: "get",
            url: host + "/api",
        });
        return response.data;
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}

export async function createPin(boardId, title) {
    try {
        await axios.post(host + "/api/pins/" + boardId, {
            title: title,
        });
    } catch (err) {
        Alert.alert(err);
    }
}

export async function createCard(title, pinId) {
    try {
        await axios.post(host + "/api/cards/" + pinId, {
            title: title,
        });
    } catch (err) {
        Alert.alert(err);
    }
}

export async function getCardDetail(cardId) {
    try {
        const response = await axios({
            method: "get",
            url: host + "/api/cards/" + cardId,
        });
        // console.log(response.data)
        return response.data;
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}
