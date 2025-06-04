import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CookieBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-gray-900 p-4 z-50">
      <Text className="text-white mb-2 text-sm">
        🍪 We use cookies to improve your experience. By using this app, you agree to our Privacy Policy.
      </Text>
      <TouchableOpacity
        className="bg-blue-500 px-4 py-2 rounded-xl self-end"
        onPress={() => setVisible(false)}
      >
        <Text className="text-white text-sm">Got it</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CookieBanner;
