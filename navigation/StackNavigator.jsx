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
      {/* <Stack.Screen name='LoginPage' component={LoginPage} />
      <Stack.Screen name='SignUpPage' component={SignUpPage} /> */}
      <Stack.Screen name='MainPage' component={MainPage} />
      <Stack.Screen name='BoardPage' component={BoardPage} />
      <Stack.Screen name='CardDetailPage' component={CardDetailPage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
