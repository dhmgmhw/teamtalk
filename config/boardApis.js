import { Alert } from "react-native";
import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const host = "http://3.35.208.142"

export async function getPins(boardId) {
    try {
        const response = await axios({
            method: "get",
            url: host + "/api/boards/" + boardId,
        });
        // console.log(response)
        return response.data;
    } catch (err) {
        const error = err.respocnse.data.error || err.message;
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

export async function deletePin(pinId) {
    try {
        await axios({
            method: "delete",
            url: host + "/api/pins/" + pinId,
        });
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
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

export async function putDescription(description, cardId, title) {
    try {
        await axios({
            method: "put",
            url: host + "/api/cards/" + cardId,
            data: {
                'description': description,
                'title': title
            }
        });
        Alert.alert('수정 완료!')
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}