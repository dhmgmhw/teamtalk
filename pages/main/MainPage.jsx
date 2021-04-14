import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  RefreshControl,
  Image,
  Alert,
  Text,
  Dimensions,
} from 'react-native';
import { Input, Overlay } from 'react-native-elements';
import { Container, Icon } from 'native-base';

import HeaderComponent from '../../components/main/HeaderComponent';
import BoardComponent from '../../components/main/BoardComponent';
import Loading from '../../Loading';
import {
  getBoardList,
  createBoard,
  getLastBoard,
} from '../../config/MainPageApis';
import data from '../../data.json';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').Height;

const mock = data.board;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function MainPage({ navigation }) {
  const [ready, setReady] = useState(false);
  const [boardList, setBoardList] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
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
      let total = boardList.length + 1;
      // console.log(total);
      let nextData = await getLastBoard(total);
      let newData = [...boardList, nextData];
      await setBoardList(newData);
      Alert.alert('크루원을 초대해 작당모의를 하세요!');
    }
  };

  const download = async () => {
    const result = await getBoardList();
    setBoardList(result);
    setReady(true);
  };

  useEffect(() => {
    download();
  }, []);

  return ready ? (
    <Container>
      <HeaderComponent event={toggleOverlay} />

      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
        {boardList.map((board, i) => {
          return (
            <BoardComponent board={board} key={i} navigation={navigation} />
          );
        })}
        <View>
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
