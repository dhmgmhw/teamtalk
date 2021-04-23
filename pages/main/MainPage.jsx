import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  Image,
  Alert,
  Text,
  Dimensions,
  LogBox,
} from 'react-native';
import { Input, Overlay } from 'react-native-elements';
import { Container, Icon } from 'native-base';

import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderComponent from '../../components/main/HeaderComponent';
import BoardComponent from '../../components/main/BoardComponent';
import { getBoardList, createBoard } from '../../config/MainPageApis';

import Loading from '../../Loading';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').Height;

export default function MainPage({ navigation }) {
  LogBox.ignoreLogs(['Warning: ...']);

  const [ready, setReady] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const newBoard = async () => {
    if (title == '') {
      Alert.alert('보드 이름을 입력해주세요!');
      return false;
    } else {
      await createBoard(title);
      setVisible(false);
      download();
      Alert.alert('보드를 생성했습니다!');
    }
  };

  // 최초 실행될 때 준비할 데이터
  const download = async () => {
    const username = await AsyncStorage.getItem('user');
    setUsername(username);
    const result = await getBoardList(username);
    setBoardList(result);
    setReady(true);
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    download();
  }, []);

  return ready ? (
    <Container>
      <HeaderComponent event={toggleOverlay} navigation={navigation} />

      <ScrollView style={styles.container}>
        {boardList == '' ? (
          <View style={styles.firstPage}>
            <Text style={styles.firstPageText}>
              게시판을 만들어 크루원들과{'\n'}
              {'\n'}정보를 공유해 보세요!
            </Text>
            <Image
              source={require('../../assets/main.png')}
              style={styles.firstPageImg}
              resizeMode={'contain'}
            />
          </View>
        ) : (
          <></>
        )}

        {/* 각각의 보드들 */}
        {boardList.map((board, i) => {
          return (
            <BoardComponent
              board={board}
              key={i}
              navigation={navigation}
              username={username}
            />
          );
        })}
        <View>
          {/* HeaderComponent의 보드 추가 버튼을 눌렀을 때 나타날 Overlay 화면 */}
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <View style={styles.modalBox}>
              <Input
                placeholder='게시판에서 정보를 공유해 보세요!'
                onChangeText={(text) => {
                  setTitle(text);
                }}
              />
              <Pressable style={styles.createBtn} onPress={newBoard}>
                <Icon
                  name='easel-outline'
                  style={{ color: 'white', fontSize: 20 }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: 'white',
                    textAlign: 'center',
                    marginLeft: 5,
                  }}>
                  새 게시판 만들기
                </Text>
              </Pressable>
            </View>
          </Overlay>
        </View>
      </ScrollView>
    </Container>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  firstPage: {
    position: 'absolute',
    alignSelf: 'center',
    top: 150,
  },
  firstPageImg: {
    height: 300,
    width: 300,
  },
  firstPageText: {
    fontSize: 20,
    textAlign: 'center',
    top: 40,
    color: '#202540',
  },
  modalBox: {
    width: diviceWidth * 0.8,
    height: 100,
  },
  createBtn: {
    backgroundColor: '#202540',
    width: 150,
    height: 28,
    alignSelf: 'center',
    borderRadius: 100,
    shadowColor: 'grey',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
});
