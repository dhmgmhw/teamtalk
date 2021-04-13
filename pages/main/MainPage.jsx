import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  RefreshControl,
  Image,
  Text,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Container } from 'native-base';
import HeaderComponent from '../../components/main/HeaderComponent';
import BoardComponent from '../../components/main/BoardComponent';
import { getBoardList } from '../../config/MainPageApis';
import data from '../../data.json';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const mock = data.board;

export default function MainPage({ navigation }) {
  const [boardList, setBoardList] = useState(mock);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const download = async () => {
    const result = await getBoardList();
    setBoardList(result);
  };

  useEffect(() => {
    download();
  }, []);

  return (
    <Container>
      <StatusBar style='light' />
      <HeaderComponent />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {boardList == '' ? (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>
              게시판을 만들어 크루원들과{'\n'}
              {'\n'}정보를 공유해 보세요!
            </Text>
            <Image
              source={require('../../assets/main.png')}
              style={styles.loadingImg}
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
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  loading: {
    position: 'absolute',
    alignSelf: 'center',
    top: 150,
  },
  loadingImg: {
    height: 300,
    width: 300,
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
    top: 40,
    color: '#202540',
  },
});
