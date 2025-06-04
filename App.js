import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { TailwindProvider } from 'tailwindcss-react-native';
import { SafeAreaView, View } from 'react-native';
import CookieBanner from './src/components/CookieBanner';

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <SafeAreaView className="flex-1">
          <View className="flex-1">
            <BottomTabNavigator />
            <CookieBanner /> {/* 👈 Shown at bottom of all screens */}
          </View>
        </SafeAreaView>
      </TailwindProvider>
    </NavigationContainer>
  );
}
