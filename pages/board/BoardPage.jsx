import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import BoardHeaderComponent from '../../components/board/BoardHeaderComponent';
import { Container, View } from 'native-base';

const diviceWidth = Dimensions.get('window').width;

export default function BoardPage({ navigation }) {
  return (
    <Container>
      <StatusBar style='light' />
      <BoardHeaderComponent navigation={navigation} />
      <ScrollView></ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({});
