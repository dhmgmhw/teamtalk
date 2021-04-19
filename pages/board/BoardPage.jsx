import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
  Pressable,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import BoardHeaderComponent from '../../components/board/BoardHeaderComponent';
import Loading from '../../Loading';

import { Container, View } from 'native-base';
import {
  createPin,
  createCard,
  getPins,
  deletePin,
} from '../../config/BoardApis';
import Swiper from 'react-native-swiper-hooks';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function BoardPage({ navigation, route }) {
  const data = route.params;
  const boardId = data.id;
  const title = data.title;

  const [ready, setReady] = useState(false);

  const [visible, SetVisible] = useState(false);
  const [inputVisible, SetInputVisible] = useState(false);
  const [delVisible, setDelVisible] = useState(false);

  const [newPin, setNewPin] = useState();
  const [newCard, setNewCard] = useState();

  const [pins, setPins] = useState(data.pins);
  const [pinId, setPinId] = useState();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    await setRefreshing(true);
    await wait(1000).then(() => setRefreshing(false));
    await download();
  }, []);

  const showPinMaker = () => {
    visible ? SetVisible(false) : SetVisible(true);
  };

  const createNewPin = async () => {
    if (newPin == '') {
      Alert.alert('핀 이름을 입력해주세요!');
    } else {
      await createPin(boardId, newPin);
      // console.log(newPin);
      {
        visible ? SetVisible(false) : SetVisible(true);
      }
      setNewPin('');
      download();
    }
  };

  const createNewCard = async () => {
    if (newCard == '') {
      Alert.alert('카드 이름을 입력해주세요!');
    } else {
      await createCard(newCard, pinId);
      setNewCard('');
      SetInputVisible(false);
      download();
    }
  };

  const removePin = async () => {
    await deletePin(pinId);
    setDelVisible(false);
    download();
  };

  const download = async () => {
    const result = await getPins(boardId);
    setPins(result.pins);
    setReady(true);
  };

  const toggleOverlay = () => {
    setDelVisible(!delVisible);
  };

  useEffect(() => {
    download();
  }, []);

  return ready ? (
    <Container
      style={{
        backgroundColor: '#EBEBEB',
      }}>
      <StatusBar style='light' />
      <BoardHeaderComponent
        navigation={navigation}
        title={title}
        func={showPinMaker}
      />
      <View>
        {visible ? (
          <View
            style={{
              width: diviceWidth,
            }}>
            <View style={styles.pinAddBox}>
              <TextInput
                style={styles.inputCard}
                placeholder='새로운 핀 이름'
                onChangeText={setNewPin}
                value={newPin}
              />
              <Pressable style={styles.pinAddBtn} onPress={createNewPin}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  Add new pin
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <></>
        )}
        <Swiper
          height={diviceHeight}
          showPagination={true}
          paginationSelectedColor={'#202540'}
          paginationPosition={'top'}
          autoplay={false}
          loop={false}
          style={styles.pin}>
          {pins.map((innerPin, i) => {
            return (
              <Pressable
                onLongPress={() => {
                  setPinId(innerPin.id);
                  setDelVisible(!delVisible);
                }}
                key={i}>
                <ScrollView
                  contentContainerStyle={styles.scrollView}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
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
                      {innerPin.title}
                    </Text>

                    {innerPin.cards.map((card, i) => {
                      return (
                        <Pressable
                          key={i}
                          style={styles.card}
                          onPress={() => {
                            navigation.navigate('CardDetailPage', card.id);
                          }}>
                          <Text style={styles.cardTitle}>{card.title}</Text>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                            }}>
                            <Text style={styles.cardUser}>Anonymous</Text>
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
                      );
                    })}
                    {inputVisible ? (
                      <View style={styles.inputBox}>
                        <TextInput
                          style={styles.input}
                          placeholder='공유할 내용'
                          onChangeText={setNewCard}
                          value={newCard}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Pressable
                            style={styles.addBtn}
                            onPress={() => {
                              SetInputVisible(false);
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '500',
                                color: 'white',
                                textAlign: 'center',
                              }}>
                              Close
                            </Text>
                          </Pressable>
                          <Pressable
                            style={styles.addBtn}
                            onPress={createNewCard}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '500',
                                color: 'white',
                                textAlign: 'center',
                              }}>
                              Add
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    ) : (
                      <Pressable
                        style={styles.cardBtn}
                        onPress={() => {
                          SetInputVisible(true);
                          setPinId(innerPin.id);
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '500',
                            color: 'white',
                            textAlign: 'center',
                            marginVertical: 5,
                          }}>
                          Card
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </ScrollView>
              </Pressable>
            );
          })}
        </Swiper>
        <Overlay
          isVisible={delVisible}
          overlayStyle={{
            backgroundColor: '#202540',
            width: diviceWidth * 0.9,
            shadowColor: 'black',
            shadowOffset: {
              width: 1,
              height: 3,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3,
          }}
          onBackdropPress={toggleOverlay}>
          <View style={styles.deleteBox}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: 'white',
                textAlign: 'center',
                marginVertical: 20,
              }}>
              핀을 삭제하시겠습니까?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Pressable
                style={styles.selectBtn}
                onPress={() => {
                  setDelVisible(false);
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable style={styles.selectBtn} onPress={removePin}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  Okay
                </Text>
              </Pressable>
            </View>
          </View>
        </Overlay>
        <Overlay
          isVisible={delVisible}
          overlayStyle={{
            backgroundColor: '#202540',
            width: diviceWidth * 0.9,
            shadowColor: 'black',
            shadowOffset: {
              width: 1,
              height: 3,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3,
          }}
          onBackdropPress={toggleOverlay}>
          <View style={styles.deleteBox}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: 'white',
                textAlign: 'center',
                marginVertical: 20,
              }}>
              핀을 삭제하시겠습니까?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Pressable
                style={styles.selectBtn}
                onPress={() => {
                  setDelVisible(false);
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable style={styles.selectBtn} onPress={removePin}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  Okay
                </Text>
              </Pressable>
            </View>
          </View>
        </Overlay>
      </View>
    </Container>
  ) : (
    <Loading />
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
    marginBottom: 5,
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
  cardBtn: {
    alignSelf: 'center',
    width: 200,
  },
  addBox: {
    width: '85%',
    backgroundColor: '#202540',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: diviceHeight,
    padding: 10,
    shadowColor: 'grey',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  pinAddBtn: {
    padding: 5,
    width: 100,
    borderColor: '#EBEBEB',
    borderRadius: 100,
    alignSelf: 'center',
  },
  pinAddBox: {
    width: '85%',
    backgroundColor: 'grey',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    padding: 15,
    shadowColor: 'grey',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  inputBox: {
    width: '100%',
    flex: 1,
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#EBEBEB',
    width: '100%',
    height: 35,
    paddingLeft: 10,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 5,
  },
  addBtn: {
    paddingTop: 5,
    width: 80,
    borderColor: '#EBEBEB',
  },
  inputCard: {
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
    shadowColor: '#202540',
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
  deleteBox: {
    height: 100,
    width: diviceWidth * 0.9,
    alignSelf: 'center',
  },
  selectBtn: {
    padding: 10,
    marginHorizontal: 20,
  },
});
