import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Icon } from 'native-base';
import { Header } from 'react-native-elements';
import { signOut } from '../../config/LoginApis';

export default function HeaderComponent({ navigation, event }) {
  const doLogout = async () => {
    console.log('Logout Pressed');
    await signOut(navigation);
  };

  return (
    <Header
      backgroundColor={'#202540'}
      leftComponent={
        <Icon
          onPress={doLogout}
          name='log-out-outline'
          style={{
            color: '#F2181C',
            fontSize: 35,
            top: 5,
          }}
        />
      }
      centerComponent={
        <Image
          style={{ height: 35, alignSelf: 'center' }}
          resizeMode='contain'
          source={require('../../assets/logo.png')}
        />
      }
      rightComponent={
        <Icon
          onPress={event}
          name='add'
          style={{ color: '#F2181C', fontSize: 35, top: 5 }}
        />
      }
    />
  );
}
const styles = StyleSheet.create({});
