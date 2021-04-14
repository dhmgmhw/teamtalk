import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Icon } from 'native-base';
import { Header } from 'react-native-elements';

export default function BoardHeaderComponent({ navigation, title }) {
  return (
    <Header
      backgroundColor={'#202540'}
      leftComponent={
        <Icon
          name='chevron-back-sharp'
          style={{ color: 'white', fontSize: 35 }}
          onPress={() => {
            navigation.goBack();
          }}
        />
      }
      centerComponent={<Text style={styles.groupName}>{title}</Text>}
      rightComponent={
        <Icon
          onPress={() => {
            console.log('참가인원');
          }}
          name='people-sharp'
          style={{ color: 'white', fontSize: 30, top: 2 }}
        />
      }
    />
  );
}
const styles = StyleSheet.create({
  groupName: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
    top: 10,
    alignSelf: 'center',
  },
});
