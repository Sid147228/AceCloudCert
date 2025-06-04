import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const PrimaryButton = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`py-3 px-6 rounded-xl ${disabled ? 'bg-gray-400' : 'bg-blue-600'}`}
      disabled={disabled}
    >
      <Text className="text-white text-lg text-center">{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
