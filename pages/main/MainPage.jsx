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
import HeaderComponent from '../../components/main/HeaderComponent';
import { Container, View } from 'native-base';

const diviceWidth = Dimensions.get('window').width;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function MainPage({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <Container>
      <StatusBar style='light' />
      <HeaderComponent />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('BoardPage');
          }}
          onLongPress={() => {
            console.log('Miracle!');
          }}>
          <Text style={styles.groupName}>19조</Text>
          <Text style={styles.groupMember}>나중에 넣을 기능</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  // 카드컴포넌트 이주
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
