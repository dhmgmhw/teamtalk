import {
    Alert
} from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const host = 'https://607434bc066e7e0017e794f9.mockapi.io'

export async function getBoardList() {
    try {
        const response = await axios({
            method: 'get',
            url: host + '/board',
        });
        // console.log(response.data)
        return response.data
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}

export async function getLastBoard(total) {
    try {
        const response = await axios({
            method: 'get',
            url: host + '/board/' + total,
        });
        // console.log(response.data)
        return response.data
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}

export async function createBoard(title) {
    try {
        await axios.post(host + '/board', {
            "title": title,
        });
        // console.log(title)
    } catch (err) {
        const error = err.response.data.error || err.message;
        Alert.alert(error);
    }
}

