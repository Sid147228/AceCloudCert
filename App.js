import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, View } from 'react-native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <BottomTabNavigator />
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}
