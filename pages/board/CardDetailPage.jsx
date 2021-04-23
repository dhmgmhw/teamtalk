import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Image,
  LogBox,
} from 'react-native';
import { Header, Overlay } from 'react-native-elements';
import { Icon, Container, Item, Input } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CardHeaderComponent from '../../components/board/CardHeaderComponent';

import {
  createComment,
  getComments,
  getUserInfo,
  getCardDetail,
  putDescription,
  putComment,
  deleteCard,
  deleteComment,
} from '../../config/BoardApis';

// 기기가 ios일 때 가독성을 위해 띄어줄 정도
const diviceBottom = Platform.OS === 'ios' ? 30 : 0;

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function CardDetailPage({ navigation, route }) {
  LogBox.ignoreLogs(['Warning: ...']);

  const cardId = route.params;

  const [mainTitle, setMainTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [comment, setComment] = useState([]);

  const [visible, setVisible] = useState(false);
  const [commentFire, setCommentFire] = useState(false);

  const [text, onChangeText] = useState();
  const [titleSetter, setTitleSetter] = useState(mainTitle);
  const [inputComment, setInputComment] = useState();

  const [commentSetter, setCommentSetter] = useState('');
  const [commentIdSetter, setCommentIdSetter] = useState('');

  const [username, setUsername] = useState('');
  const [userSkill, setUserSkill] = useState('');

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const download = async () => {
    const result = await getCardDetail(cardId);
    const resultComment = await getComments(cardId);
    let list = [];
    for (let i in resultComment.comments) {
      list.push([
        resultComment.comments[i].comment,
        resultComment.comments[i].id,
      ]);
    }
    setComment(list);
    setMainTitle(result.card.title);
    setDesc(result.card.description);
    onChangeText(result.card.description);
    setTitleSetter(result.card.title);
    loadUserInfo();
  };

  const leaveComment = async () => {
    await createComment(inputComment, cardId);
    setInputComment('');
    await download();
  };

  const donePressed = async () => {
    await putDescription(text, cardId, titleSetter);
    toggleOverlay();
    await download();
  };

  const cancelPressed = () => {
    toggleOverlay();
    onChangeText('');
  };

  const removeCard = async () => {
    await deleteCard(cardId);
    navigation.pop();
  };

  const updateComment = async () => {
    await putComment(commentSetter, cardId, commentIdSetter);
    setCommentFire(false);
    await download();
  };

  const removeComment = async () => {
    await deleteComment(commentSetter, cardId, commentIdSetter);
    setCommentFire(false);
    await download();
  };

  const loadUserInfo = async () => {
    const result = await getUserInfo();
    if (result.userSkill == 'React') {
      setUserSkill(require(`../../assets/react.png`));
    } else if (result.userSkill == 'React Native') {
      setUserSkill(require(`../../assets/reactnative.png`));
    } else if (result.userSkill == 'Spring') {
      setUserSkill(require(`../../assets/spring.png`));
    } else if (result.userSkill == 'Node.js') {
      setUserSkill(require(`../../assets/node.png`));
    } else {
      setUserSkill(require(`../../assets/iu.png`));
    }
    const username = await AsyncStorage.getItem('user');
    setUsername(username);
  };

  useEffect(() => {
    download();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <Container style={styles.container}>
        <StatusBar style='auto' />
        <CardHeaderComponent
          navigation={navigation}
          title={mainTitle}
          removeCard={removeCard}
        />
        <View style={styles.descBox}>
          <Text
            style={{
              paddingLeft: 20,
              marginVertical: 10,
              color: 'grey',
              fontSize: 15,
            }}>
            Description
          </Text>
          <Pressable onPress={toggleOverlay}>
            <Text style={styles.desc}>{desc}</Text>
          </Pressable>
          <Text
            style={{
              paddingLeft: 20,
              marginTop: 50,
              marginBottom: 10,
              color: 'grey',
              fontSize: 15,
            }}>
            Comment
          </Text>

          {comment == null ? (
            <Text style={styles.desc}>코멘트를 남겨보세요</Text>
          ) : (
            <>
              {comment.map((comment, i) => {
                return (
                  <Pressable
                    style={styles.commentBox}
                    key={i}
                    onLongPress={() => {
                      setCommentIdSetter(comment[1]);
                      setCommentSetter(comment[0]);
                      setCommentFire(true);
                    }}>
                    <View>
                      <Text style={styles.commentDesc}>{comment[0]}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: 25,
                          height: 25,
                          borderRadius: 100,
                        }}
                        resizeMode='cover'
                        source={userSkill}
                      />
                      <Text style={styles.cardUser}>{username}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </>
          )}
        </View>
        <KeyboardAvoidingView style={styles.CommentBar} behavior='position'>
          <Item style={styles.CommentBox}>
            <Input
              placeholder='Leave Comment'
              onChangeText={(comment) => {
                setInputComment(comment);
              }}
              value={inputComment}
              style={{
                paddingLeft: 20,
                backgroundColor: '#eeeeee',
                margin: 7,
                height: 40,
                borderWidth: 1,
                borderColor: 'lightgrey',
                borderRadius: 100,
              }}
            />
            <Icon
              active
              onPress={leaveComment}
              name='chatbox'
              style={{ marginHorizontal: 10, top: 5, color: '#202540' }}
            />
          </Item>
        </KeyboardAvoidingView>
        <Overlay
          isVisible={visible}
          fullScreen={true}
          onBackdropPress={toggleOverlay}>
          <Header
            backgroundColor={'white'}
            leftComponent={
              <Pressable onPress={cancelPressed}>
                <Text style={styles.headerTitle}>Cancel</Text>
              </Pressable>
            }
            centerComponent={
              <TextInput
                style={styles.titleInput}
                onChangeText={(text) => {
                  setTitleSetter(text);
                }}
                value={titleSetter}
                placeholder='Title'
              />
            }
            rightComponent={
              <Pressable onPress={donePressed}>
                <Text style={styles.headerTitle}>Done</Text>
              </Pressable>
            }
          />
          <View style={styles.overlayBox}>
            <View style={styles.descInputBox}>
              <TextInput
                style={styles.descInput}
                onChangeText={(text) => {
                  onChangeText(text);
                }}
                value={text}
                multiline={true}
                placeholder='Description'
              />
            </View>
          </View>
        </Overlay>
        <Overlay
          isVisible={commentFire}
          overlayStyle={{
            backgroundColor: '#E4E4E4',
            width: diviceWidth * 0.8,
            shadowColor: 'black',
            shadowOffset: {
              width: 1,
              height: 3,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3,
          }}
          onBackdropPress={() => {
            setCommentFire(false);
          }}>
          <View style={styles.deleteBox}>
            <TextInput
              style={styles.commentUpdateInput}
              onChangeText={(text) => {
                setCommentSetter(text);
              }}
              value={commentSetter}
              multiline={true}
              placeholder='수정할 내용'
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Pressable style={styles.selectBtn} onPress={removeComment}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#202540',
                    textAlign: 'center',
                  }}>
                  삭제
                </Text>
              </Pressable>
              <Pressable style={styles.selectBtn} onPress={updateComment}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#202540',
                    textAlign: 'center',
                  }}>
                  수정
                </Text>
              </Pressable>
            </View>
          </View>
        </Overlay>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
  },
  CommentBar: {
    width: diviceWidth,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  CommentBox: {
    backgroundColor: '#eeeeee',
    paddingBottom: diviceBottom,
  },
  descBox: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 100,
  },
  desc: {
    fontSize: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    lineHeight: 25,
    color: '#202540',
    backgroundColor: '#E4E4E4',
  },
  overlayBox: {
    alignSelf: 'center',
  },
  descInputBox: {
    width: diviceWidth,
    height: diviceHeight,
    backgroundColor: '#eeeeee',
    paddingTop: 10,
  },
  descInput: { textAlignVertical: 'top', padding: 20 },
  titleInput: { fontSize: 17, fontWeight: '500', color: '#202540' },
  headerTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#202540',
  },
  deleteBox: {
    height: 100,
    width: '90%',
    alignSelf: 'center',
  },
  selectBtn: {
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  commentUpdateInput: {
    marginTop: 10,
    padding: 5,
    borderBottomWidth: 2,
    borderColor: '#202540',
  },
  commentBox: {
    width: diviceWidth,
    height: 45,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E4E4E4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardUser: {
    fontSize: 15,
    marginLeft: 5,
  },
  commentDesc: {
    fontSize: 15,
    color: '#202540',
  },
});
