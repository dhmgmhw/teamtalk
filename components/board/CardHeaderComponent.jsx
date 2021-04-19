import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Icon } from 'native-base';
import { Header } from 'react-native-elements';

export default function CardHeaderComponent({ navigation, title, removeCard }) {
  return (
    <Header
      backgroundColor={'#ebebeb'}
      leftComponent={
        <Icon
          name='chevron-back-sharp'
          style={{ color: '#202540', fontSize: 35 }}
          onPress={() => {
            navigation.goBack();
          }}
        />
      }
      centerComponent={<Text style={styles.cardTitle}>{title}</Text>}
      rightComponent={
        <Icon
          name='trash-outline'
          style={{ color: '#202540', fontSize: 25, top: 5 }}
          onPress={removeCard}
        />
      }
    />
  );
}
const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 18,
    color: '#202540',
    fontWeight: '600',
    top: 10,
    alignSelf: 'center',
  },
});
