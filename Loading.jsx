import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Thumbnail } from 'native-base';
const LoadingImage = require('./assets/loading.gif');
export default function Loading() {
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <Thumbnail large source={LoadingImage}></Thumbnail>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202540',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
