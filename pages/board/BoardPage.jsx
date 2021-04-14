import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import BoardHeaderComponent from '../../components/board/BoardHeaderComponent';
import { Container, View, Button, Icon } from 'native-base';
import { Input, Overlay } from 'react-native-elements';

import Swiper from 'react-native-swiper-hooks';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function BoardPage({ navigation, route }) {
  const data = route.params;
  const title = data.title;
  const pin = data.pin;

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [visible, setVisible] = useState(false);
  const [pinTitle, setPinTitle] = useState('');
  const [text, onChangeText] = useState();
  const [inputVisible, SetInputVisible] = useState(false);

  useEffect(() => {}, []);

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
          style={styles.pin}>
          <ScrollView
            style={{
              width: diviceWidth,
            }}>
            <View style={styles.addBox}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: 'white',
                  paddingHorizontal: 10,
                  marginBottom: 10,
                }}>
                제목이 될거야
              </Text>
              <Pressable
                style={styles.card}
                onPress={() => {
                  console.log('enter card');
                }}>
                <Text style={styles.cardTitle}>빙빙 음</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.cardUser}>김제코</Text>
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                    }}
                    resizeMode='cover'
                    source={require('../../assets/iu.png')}
                  />
                </View>
              </Pressable>

              {inputVisible ? (
                <TextInput
                  style={styles.input}
                  placeholder='공유할 내용'
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
          </ScrollView>
          <ScrollView
            style={{
              width: diviceWidth,
            }}>
            <View style={styles.addBox}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: 'white',
                  paddingHorizontal: 10,
                  marginBottom: 10,
                }}>
                제목이 될거야
              </Text>
              {/* <Pressable
                style={styles.card}
                onPress={() => {
                  console.log('enter card');
                }}>
                <Text style={styles.cardTitle}>빙빙 음</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.cardUser}>김제코</Text>
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                    }}
                    resizeMode='cover'
                    source={require('../../assets/iu.png')}
                  />
                </View>
              </Pressable> */}

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
          </ScrollView>
        </Swiper>
        <Button
          style={styles.addPinBtn}
          onPress={() => {
            setVisible(true);
          }}>
          <Icon
            name='duplicate'
            style={{ color: 'white', fontSize: 30, alignSelf: 'center' }}
          />
        </Button>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={styles.modalBox}>
            <Input
              placeholder='새로운 핀 제목'
              onChangeText={(text) => {
                setPinTitle(text);
              }}
            />
            <Pressable
              style={{ backgroundColor: 'red' }}
              onPress={() => {
                console.log('pressed!');
              }}>
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
    </Container>
  );
}

const styles = StyleSheet.create({
  pin: {
    padding: 10,
  },
  card: {
    backgroundColor: 'lightgrey',
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginLeft: 5,
    width: '100%',
  },
  cardUser: {
    fontSize: 15,
    marginRight: 5,
    width: '100%',
    textAlign: 'right',
  },
  addBtn: {
    alignSelf: 'center',
    width: 200,
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
  addPinBtn: {
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: '#F2181C',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    top: diviceHeight * 0.75,
    alignSelf: 'center',
  },
  modalBox: {
    width: diviceWidth * 0.8,
    height: 100,
  },
});
