import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from '../pages/login/LoginPage';
import SignUpPage from '../pages/login/SignUpPage';
import MainPage from '../pages/main/MainPage';
import BoardPage from '../pages/board/BoardPage';
import PinDetail from '../pages/board/PinDetail';

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
      <Stack.Screen name='PinDetail' component={PinDetail} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
