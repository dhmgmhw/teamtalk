import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from '../pages/login/LoginPage';
import SignUpPage from '../pages/login/SignUpPage';
import MainPage from '../pages/main/MainPage';
import BoardPage from '../pages/board/BoardPage';
import CardDetailPage from '../pages/board/CardDetailPage';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name='LoginPage'
        component={LoginPage}
        options={{ gestureEnabled: false }}
        // gestureEnabled: false를 넣어줌으로써 LoginPage, MainPage에서의 ios뒤로가기 제스처가 나타나지 못하게 함
      />
      <Stack.Screen name='SignUpPage' component={SignUpPage} />
      <Stack.Screen
        name='MainPage'
        component={MainPage}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name='BoardPage' component={BoardPage} />
      <Stack.Screen name='CardDetailPage' component={CardDetailPage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
