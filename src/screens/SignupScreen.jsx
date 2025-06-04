import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(false);
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!consent) {
      Alert.alert('Consent Required', 'Please agree to the terms.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created!');
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold mb-4 text-center">📝 Sign Up</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border rounded-xl p-3 mb-4"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border rounded-xl p-3 mb-6"
      />

      <TouchableOpacity
        onPress={() => setConsent(!consent)}
        className="mb-4"
      >
        <Text className="text-gray-700">
          <Text className={consent ? 'text-green-600 font-bold' : 'text-red-600'}>☑</Text> I agree to the Terms & Privacy Policy
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-blue-600 py-3 rounded-xl"
        onPress={handleSignup}
      >
        <Text className="text-white text-center text-lg">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
