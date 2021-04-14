import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
  Pressable,
} from 'react-native';
import BoardHeaderComponent from '../../components/board/BoardHeaderComponent';
import { Container, View } from 'native-base';
import Swiper from 'react-native-swiper-hooks';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function BoardPage({ navigation, route }) {
  const data = route.params;
  const title = data.title;
  const pin = data.pin;

  const [text, onChangeText] = useState();
  const [inputVisible, SetInputVisible] = useState(false);

  useEffect(() => {
    console.log(pin);
  }, []);

  return (
    <Container
      style={{
        backgroundColor: '#EBEBEB',
      }}>
      <StatusBar style='light' />
      <BoardHeaderComponent navigation={navigation} title={title} />
      <View>
        <Swiper
          height={diviceHeight}
          showPagination={true}
          paginationSelectedColor={'black'}
          autoplay={false}
          loop={false}
          direction={'row'}
          style={styles.pinCard}>
          <View
            style={{
              width: diviceWidth,
            }}>
            <View style={styles.addBox}>
              {inputVisible ? (
                <TextInput
                  style={styles.input}
                  placeholder='새로운 핀 이름'
                  onChangeText={onChangeText}
                  value={text}
                />
              ) : (
                <></>
              )}
              <Pressable
                style={styles.addBtn}
                onPress={() => {
                  {
                    inputVisible
                      ? SetInputVisible(false)
                      : SetInputVisible(true);
                  }
                  console.log('add!');
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  Add...
                </Text>
              </Pressable>
            </View>
          </View>
        </Swiper>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  pinCard: {
    padding: 10,
  },
  addBtn: {
    alignSelf: 'center',
    width: 100,
  },
  addBox: {
    width: '85%',
    backgroundColor: '#202540',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
  input: {
    backgroundColor: '#EBEBEB',
    width: '100%',
    height: 40,
    paddingLeft: 10,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
});
