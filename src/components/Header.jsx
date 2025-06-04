import React from 'react';
import { View, Text } from 'react-native';

const Header = ({ title }) => {
  return (
    <View className="w-full p-4 bg-blue-600">
      <Text className="text-white text-2xl font-bold">{title}</Text>
    </View>
  );
};

export default Header;
