import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import { register } from '../../config/LoginApis';
import InputItem from '../../components/InputItem';

// 기술스택 이미지 경로
const react = require('../../assets/react.png');
const reactnative = require('../../assets/reactnative.png');
const spring = require('../../assets/spring.png');
const node = require('../../assets/node.png');

const WindowWidth = Dimensions.get('window').width;

export default function SignUpPage({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [skill, setSkill] = useState('주특기를 선택하지 않았습니다.');

  let skillChoose = (d) => {
    setSkill(d);
  };

  const signup = async () => {
    if (password !== passwordConfirm) {
      Alert.alert('비밀번호가 서로 일치 하지 않습니다.');
      setPasswordConfirm('');
      return false;
    } else {
      setPasswordConfirm('');
      setPassword('');
    }
    if (skill == '주특기를 선택하지 않았습니다.') {
      Alert.alert('주특기를 선택해주세요.');
    } else {
      await register(name, password, skill, navigation);
      Alert.alert('가입 성공!');
    }
  };

  return (
    // TouchableWithoutFeedback로 ios환경에서 다른영역 터치 시 키보드가 내려가도록 함 Keyboard.dismiss
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        {/* KeyboardAvoidingView로 ios환경에서 키보드가 인풋을 가리는 것을 방지함 */}
        <KeyboardAvoidingView behavior={'position'}>
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
                    await skillChoose('React');
                  }}>
                  <Image
                    style={styles.text}
                    source={react}
                    resizeMode={'cover'}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.child, { backgroundColor: 'transparent' }]}>
                <TouchableOpacity
                  onPress={async () => {
                    await skillChoose('React Native');
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
                    await skillChoose('Spring');
                  }}>
                  <Image
                    style={styles.text}
                    source={spring}
                    resizeMode={'cover'}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.child, { backgroundColor: 'transparent' }]}>
                <TouchableOpacity
                  onPress={async () => {
                    await skillChoose('Node.js');
                  }}>
                  <Image
                    style={styles.text}
                    source={node}
                    resizeMode={'cover'}
                  />
                </TouchableOpacity>
              </View>
            </SwiperFlatList>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                alignSelf: 'center',
                color: 'white',
                borderColor: 'white',
              }}>
              {skill}
            </Text>
          </View>
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
              onPress={signup}>
              <Text style={{ fontSize: 17, color: 'white', fontWeight: '500' }}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
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
    marginBottom: 30,
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
    marginTop: 30,
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
    paddingBottom: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
