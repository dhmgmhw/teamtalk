import React, { useEffect } from 'react';
import { StyleSheet, Text, Dimensions, Pressable } from 'react-native';
import { deleteBoard } from '../../config/MainPageApis';

const diviceWidth = Dimensions.get('window').width;

export default function BoardComponent({ navigation, board }) {
  const boardId = board.id;

  const removeBoard = async () => {
    await deleteBoard(boardId, navigation);
  };

  return (
    <>
      <Pressable
        style={styles.card}
        onPress={() => {
          navigation.navigate('BoardPage', board);
        }}
        onLongPress={removeBoard}>
        <Text style={styles.groupName}>{board.title}</Text>
        <Text style={styles.groupMember}>{board.user}</Text>
      </Pressable>
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
});
