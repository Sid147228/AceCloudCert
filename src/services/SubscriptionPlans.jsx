import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../services/firebase';
import { getSubscriptionStatus } from '../services/stripe';

const SubscriptionPlans = () => {
  const [plan, setPlan] = useState('Loading...');

  useEffect(() => {
    const email = auth.currentUser?.email || '';
    const status = getSubscriptionStatus(email);
    setPlan(status);
  }, []);

  const handleUpgrade = () => {
    Alert.alert("Upgrade", "Redirecting to Stripe (Mock)");
    // Simulate Stripe checkout redirect
  };

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-4">💼 Your Subscription</Text>
      <Text className="text-lg mb-4">Current Plan: <Text className="text-blue-700">{plan}</Text></Text>

      {plan === 'Free' && (
        <TouchableOpacity onPress={handleUpgrade} className="bg-yellow-500 py-3 px-6 rounded-xl mb-3">
          <Text className="text-white text-center">Upgrade to Silver</Text>
        </TouchableOpacity>
      )}

      {(plan === 'Free' || plan === 'Silver') && (
        <TouchableOpacity onPress={handleUpgrade} className="bg-orange-600 py-3 px-6 rounded-xl">
          <Text className="text-white text-center">Upgrade to Gold</Text>
        </TouchableOpacity>
      )}

      {plan === 'Gold' && (
        <Text className="mt-6 text-green-700 font-semibold">✅ You have full access to all mock tests and certificates!</Text>
      )}
    </View>
  );
};

export default SubscriptionPlans;
