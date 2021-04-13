import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Dimensions, Pressable } from 'react-native';

const diviceWidth = Dimensions.get('window').width;

export default function BoardComponent({ navigation, board }) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        navigation.navigate('BoardPage');
      }}
      onLongPress={() => {
        console.log('Miracle!');
      }}>
      <Text style={styles.groupName}>{board.title}</Text>
      <Text style={styles.groupMember}>{board.name}</Text>
    </Pressable>
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
    fontSize: 23,
    color: 'white',
    fontWeight: '600',
    marginTop: 20,
    marginLeft: 25,
  },
  groupMember: {
    fontSize: 15,
    color: 'white',
    textAlign: 'right',
    marginRight: 20,
    bottom: 5,
  },
});
