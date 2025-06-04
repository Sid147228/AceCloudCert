import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { generateCertificatePDF } from '../utils/generateCertificate';

const CertificateScreen = () => {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Feature Not Available',
        'PDF certificate generation is only supported on Android or iOS devices.'
      );
      return;
    }

    setLoading(true);
    try {
      await generateCertificatePDF({
        name: 'John Doe', // Replace with dynamic user name later
        score: 85,        // Replace with actual score later
        examName: 'AWS Solutions Architect Associate'
      });
    } catch (err) {
      Alert.alert('Error', err.message);
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-xl font-bold mb-6 text-center">🎓 Generate Your Certificate</Text>

      <TouchableOpacity
        onPress={handleGenerate}
        className="bg-blue-600 px-5 py-3 rounded-xl"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-lg">Generate PDF</Text>
        )}
      </TouchableOpacity>

      {Platform.OS === 'web' && (
        <Text className="text-sm text-gray-500 mt-4 text-center">
          PDF download is not available in browser preview.
        </Text>
      )}
    </View>
  );
};

export default CertificateScreen;
