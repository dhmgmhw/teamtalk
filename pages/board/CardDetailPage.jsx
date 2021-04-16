import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { Icon, Container, Item, Input } from 'native-base';
import CardHeaderComponent from '../../components/board/CardHeaderComponent';
import { getCardDetail } from '../../config/BoardApis';
const diviceBottom = Platform.OS === 'ios' ? 30 : 0;
const diviceWidth = Dimensions.get('window').width;

export default function CardDetailPage({ navigation, route }) {
  const cardId = route.params;

  const [mainTitle, SetMainTitle] = useState('');
  const [desc, SetDesc] = useState('');
  const [comment, SetComment] = useState('');

  const download = async () => {
    const result = await getCardDetail(cardId);
    SetMainTitle(result.card.title);
    SetDesc(result.card.description);
    SetComment(result.card.comment);
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
        <CardHeaderComponent navigation={navigation} title={mainTitle} />
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
          <Text style={styles.desc}>{desc}</Text>
          <Text
            style={{
              paddingLeft: 20,
              marginTop: 50,
              color: 'grey',
              fontSize: 15,
            }}>
            Comment
          </Text>
          <Text style={styles.desc}>{comment}</Text>
        </View>
        <KeyboardAvoidingView style={styles.CommentBar} behavior='position'>
          <Item style={styles.CommentBox}>
            <Input
              placeholder='Leave Comment'
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
              onPress={() => {
                console.log('comment!');
              }}
              name='chatbox'
              style={{ marginHorizontal: 10, top: 5, color: '#202540' }}
            />
          </Item>
        </KeyboardAvoidingView>
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
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 100,
  },
  desc: {
    fontSize: 17,
    paddingHorizontal: 20,
    lineHeight: 25,
    color: '#202540',
  },
});
