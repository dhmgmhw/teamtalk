import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const host = "http://3.35.208.142"

export async function getUserInfo() {
    try {
        const username = await AsyncStorage.getItem('user');
        const response = await axios({
            method: "get",
            url: host + `/main/${username}`,
        });
        // console.log(response.data)
        return response.data;
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}

export async function getPins(boardId) {
    try {
        const response = await axios({
            method: "get",
            url: host + `/api/boards/${boardId}`,
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
        const token = await AsyncStorage.getItem('session');
        await axios({
            method: "post",
            url: host + `/api/pins/${boardId}`,
            data: {
                title: title
            },
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}

export async function deletePin(pinId) {
    try {
        await axios({
            method: "delete",
            url: host + `/api/pins/${pinId}`,
        });
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}

export async function createCard(title, pinId) {
    try {
        await axios.post(host + `/api/cards/${pinId}`, {
            title: title,
        });
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}

export async function getCardDetail(cardId) {
    try {
        const response = await axios({
            method: "get",
            url: host + `/api/cards/${cardId}`,
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
            url: host + `/api/cards/${cardId}`,
            data: {
                description: description,
                title: title
            }
        });
        Alert.alert('수정 완료!')
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}

export async function deleteCard(cardId) {
    try {
        await axios({
            method: "delete",
            url: host + `/api/cards/${cardId}`,
        });
        Alert.alert('카드를 삭제하였습니다.')
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}

export async function getComments(card_id) {
    try {
        const token = await AsyncStorage.getItem('session');
        const response = await axios({
            method: "get",
            url: host + `/api/cards/${card_id}/comments`,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        // console.log(response.data)
        return response.data;
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}

export async function createComment(comment, card_id) {
    try {
        const token = await AsyncStorage.getItem('session');
        await axios({
            method: "post",
            url: host + `/api/cards/${card_id}/comments`,
            data: {
                comment: comment,
            },
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
    } catch (err) {
        const error = err.response.data.err || err.message;
        Alert.alert(error);
    }
}

export async function putComment(comment, card_id, comment_id) {
    try {
        const token = await AsyncStorage.getItem('session');
        await axios({
            method: "put",
            url: host + `/api/cards/${card_id}/comments/${comment_id}`,
            data: {
                comment: comment,
            },
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        Alert.alert('수정 완료!')
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}

export async function deleteComment(comment, card_id, comment_id) {
    try {
        const token = await AsyncStorage.getItem('session');
        await axios({
            method: "delete",
            url: host + `/api/cards/${card_id}/comments/${comment_id}`,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        Alert.alert('삭제 완료!')
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}

// 코멘트 관련 api들은 전부 토큰까지 넘겨줍시다.