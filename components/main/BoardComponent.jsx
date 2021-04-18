import { View } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Text, Dimensions, Pressable } from 'react-native';
import { deleteBoard } from '../../config/MainPageApis';
import { Overlay } from 'react-native-elements';

const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function BoardComponent({ navigation, board }) {
  const boardId = board.id;

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const removeBoard = async () => {
    setVisible(false);
    await deleteBoard(boardId, navigation);
  };

  return (
    <>
      <Pressable
        style={styles.card}
        onPress={() => {
          navigation.navigate('BoardPage', board);
        }}
        onLongPress={() => {
          setVisible(true);
        }}>
        <Text style={styles.groupName}>{board.title}</Text>
        <Text style={styles.groupMember}>{board.user}</Text>
      </Pressable>
      <Overlay
        isVisible={visible}
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
            보드를 삭제하시겠습니까?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Pressable
              style={styles.selectBtn}
              onPress={() => {
                setVisible(false);
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
            <Pressable style={styles.selectBtn} onPress={removeBoard}>
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
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: diviceWidth * 0.95,
    height: 70,
    backgroundColor: '#202540',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  groupName: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    marginTop: 20,
    marginLeft: 25,
  },
  groupMember: {
    fontSize: 15,
    color: 'white',
    textAlign: 'right',
    marginRight: 20,
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
