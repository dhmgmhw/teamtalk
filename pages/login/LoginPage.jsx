import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const talk = require('../../assets/logo.png');

import ButtonItem from '../../components/ButtonItem';
import TextItem from '../../components/TextItem';
import InputItem from '../../components/InputItem';

import { signIn } from '../../config/LoginApis';
import Loading from '../../Loading';

export default function LoginPage({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  const buttonShow = () => {
    setShow(true);
  };

  const doSignIn = () => {
    signIn(name, password, navigation);
  };

  const showButton = () => {
    if (name == '' || password == '') {
      // name, password가 공란이면 버튼 disabled
      return (
        <TouchableOpacity disabled style={[styles.button, styles.disabled]}>
          <Text style={styles.text}>Log In</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.button, styles.active]}
          onPress={doSignIn}>
          <Text style={styles.text}>Log In</Text>
        </TouchableOpacity>
      );
    }
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    // 최초실행시 AsyncStorage에 토큰이 있다면 MainPage로 이동
    setTimeout(() => {
      AsyncStorage.getItem('session', (err, result) => {
        if (result) {
          navigation.push('MainPage');
        } else {
          setReady(true);
        }
      });
      setReady(true);
    });
  }, []);

  return ready ? (
    show ? (
      <View style={styles.container}>
        <StatusBar style='light' />
        <Image source={talk} resizeMode='contain' style={{ width: 300 }} />
        <Text style={{ fontSize: 19, color: 'white', marginBottom: 100 }}>
          <Text style={{ fontSize: 19, color: '#F2181C' }}>팀</Text>
          프로젝트를 <Text style={{ fontSize: 19, color: '#F2181C' }}>톡</Text>
          톡히 도와주는 협업툴
        </Text>

        <InputItem hint={'이름'} value={name} setFunc={setName} />
        <InputItem
          hint={'비밀번호'}
          type={'password'}
          value={password}
          setFunc={setPassword}
        />
        {showButton()}

        <View style={{ marginTop: 100 }}>
          <TextItem
            title={'Sign up'}
            navigation={navigation}
            page={'SignUpPage'}
          />
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <Image source={talk} resizeMode='contain' style={{ width: 300 }} />
        <Text style={{ fontSize: 19, color: 'white', marginBottom: 100 }}>
          <Text style={{ fontSize: 19, color: '#F2181C' }}>팀</Text>
          프로젝트를 <Text style={{ fontSize: 19, color: '#F2181C' }}>톡</Text>
          톡히 도와주는 협업툴
        </Text>
        <ButtonItem
          title={'Log In'}
          navigation={navigation}
          page={'LoginPage'}
          show={buttonShow}
        />
        <View style={{ marginTop: 50 }}>
          <TextItem
            title={'회원가입'}
            navigation={navigation}
            page={'SignUpPage'}
          />
        </View>
      </View>
    )
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202540',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
