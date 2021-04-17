import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
} from 'react-native';
import { Header, Overlay } from 'react-native-elements';
import { Icon, Container, Item, Input } from 'native-base';
import CardHeaderComponent from '../../components/board/CardHeaderComponent';
import { getCardDetail, putDescription } from '../../config/BoardApis';
const diviceBottom = Platform.OS === 'ios' ? 30 : 0;
const diviceWidth = Dimensions.get('window').width;
const diviceHeight = Dimensions.get('window').height;

export default function CardDetailPage({ navigation, route }) {
  const cardId = route.params;

  const [mainTitle, SetMainTitle] = useState('');
  const [desc, SetDesc] = useState('');
  const [comment, SetComment] = useState('');

  const [visible, setVisible] = useState(false);

  const [text, onChangeText] = useState();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const download = async () => {
    const result = await getCardDetail(cardId);
    SetMainTitle(result.card.title);
    SetDesc(result.card.description);
    SetComment(result.card.comment);
  };

  const donePressed = async () => {
    const result = await putDescription(desc, cardId, mainTitle);
    console.log(result);
    toggleOverlay();
    onChangeText('');
  };

  const cancelPressed = () => {
    toggleOverlay();
    onChangeText('');
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
          <Pressable onPress={toggleOverlay}>
            <Text style={styles.desc}>{desc}</Text>
          </Pressable>
          <Text
            style={{
              paddingLeft: 20,
              marginTop: 50,
              marginBottom: 10,
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
        <Overlay
          isVisible={visible}
          fullScreen={true}
          onBackdropPress={toggleOverlay}>
          <Header
            backgroundColor={'white'}
            leftComponent={
              <Pressable onPress={cancelPressed}>
                <Text style={styles.headerTitle}>Cancel</Text>
              </Pressable>
            }
            centerComponent={
              <Text style={styles.headerTitle}>Description</Text>
            }
            rightComponent={
              <Pressable onPress={donePressed}>
                <Text style={styles.headerTitle}>Done</Text>
              </Pressable>
            }
          />
          <View style={styles.overlayBox}>
            <View style={styles.descInputBox}>
              <TextInput
                style={styles.descInput}
                onChangeText={onChangeText}
                value={text}
                multiline={true}
                placeholder='Description'
              />
            </View>
          </View>
        </Overlay>
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
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 100,
  },
  desc: {
    fontSize: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    lineHeight: 25,
    color: '#202540',
    backgroundColor: '#E4E4E4',
  },
  overlayBox: {
    alignSelf: 'center',
  },
  descInputBox: {
    width: diviceWidth,
    height: diviceHeight,
    backgroundColor: '#eeeeee',
    paddingTop: 10,
  },
  descInput: { textAlignVertical: 'top', padding: 20 },
  headerTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#202540',
  },
});
