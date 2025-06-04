import React from 'react';
import { View, Text } from 'react-native';

const Dashboard = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>✅ App Launched</Text>
      <Text style={{ marginTop: 10 }}>You're on the Dashboard screen.</Text>
    </View>
  );
};

export default Dashboard;
