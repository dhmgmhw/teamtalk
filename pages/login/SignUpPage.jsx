import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Thumbnail } from 'native-base';

const talk = require('../../assets/teamtalk.png');
const react = require('../../assets/react.png');
const reactnative = require('../../assets/reactnative.png');
const spring = require('../../assets/spring.png');
const node = require('../../assets/node.png');
const iu = require('../../assets/iu.png');
const WindowWidth = Dimensions.get('window').width;

import InputItem from '../../components/InputItem';

import { signup } from '../../config/LoginApis';

export default function SignUpPage({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [skill, setSkill] = useState('');

  let skillChoose = (d) => {
    setSkill(d);
  };

  const register = async () => {
    if (password !== passwordConfirm) {
      Alert.alert('비밀번호가 서로 일치 하지 않습니다.');
      setPasswordConfirm('');
      return false;
    } else {
      setPasswordConfirm('');
      setPassword('');
    }
    signup(name, password, skill, navigation);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          alignSelf: 'center',
          color: 'white',
          marginBottom: 30,
          marginTop: 100,
        }}>
        크루 정보
      </Text>
      <View style={styles.swipercontainer}>
        <SwiperFlatList autoplay={false} showPagination>
          <View style={[styles.child, { backgroundColor: 'transparent' }]}>
            <TouchableOpacity
              onPress={async () => {
                await skillChoose(react);
                await Alert.alert('React 선택!');
              }}>
              <Image style={styles.text} source={react} resizeMode={'cover'} />
            </TouchableOpacity>
          </View>
          <View style={[styles.child, { backgroundColor: 'transparent' }]}>
            <TouchableOpacity
              onPress={async () => {
                await skillChoose(reactnative);
                await Alert.alert('ReactNative 선택!');
              }}>
              <Image
                style={styles.text}
                source={reactnative}
                resizeMode={'cover'}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.child, { backgroundColor: 'transparent' }]}>
            <TouchableOpacity
              onPress={async () => {
                await skillChoose(spring);
                await Alert.alert('Spring 선택!');
              }}>
              <Image style={styles.text} source={spring} resizeMode={'cover'} />
            </TouchableOpacity>
          </View>
          <View style={[styles.child, { backgroundColor: 'transparent' }]}>
            <TouchableOpacity
              onPress={async () => {
                await skillChoose(node);
                await Alert.alert('Node.js 선택!');
              }}>
              <Image style={styles.text} source={node} resizeMode={'cover'} />
            </TouchableOpacity>
          </View>
        </SwiperFlatList>
      </View>
      <StatusBar style='auto' />
      <View style={{ marginBottom: 80 }}>
        <InputItem hint={'이름'} value={name} setFunc={setName} />
        <InputItem
          hint={'비밀번호'}
          type={'password'}
          value={password}
          setFunc={setPassword}
        />
        <InputItem
          hint={'비밀번호 확인'}
          type={'password'}
          value={passwordConfirm}
          setFunc={setPasswordConfirm}
        />
        <TouchableOpacity
          style={[styles.button, styles.active]}
          onPress={() => {
            navigation.navigate('MainPage');
          }}>
          <Text style={{ fontSize: 18, color: 'white' }}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202540',
  },
  swipercontainer: {
    backgroundColor: '#202540',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    marginBottom: 60,
  },
  active: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  button: {
    backgroundColor: '#F2181C',
    width: 265,
    height: 40,
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  child: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WindowWidth,
    paddingBottom: 30,
  },
});
