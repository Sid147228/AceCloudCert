import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

const ProfileScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth).catch(err => console.log(err));
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-2xl font-bold mb-4">👤 Your Profile</Text>
      {user ? (
        <>
          <Text className="text-lg mb-2">Email: {user.email}</Text>
          <Text className="text-md text-gray-600 mb-6">Subscription: Free Plan</Text>

          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 px-6 py-3 rounded-xl"
          >
            <Text className="text-white text-lg">Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text className="text-gray-700">Not logged in</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
