import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const TermsPrivacy = () => {
  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-4">📜 Terms & Privacy Policy</Text>

      <Text className="text-lg font-semibold mt-4 mb-1">1. Introduction</Text>
      <Text className="text-base text-gray-700 mb-2">
        AceCloudCert is committed to protecting your data and ensuring transparency in how we handle it.
      </Text>

      <Text className="text-lg font-semibold mt-4 mb-1">2. Data Usage</Text>
      <Text className="text-base text-gray-700 mb-2">
        We only collect and store information necessary for user authentication, test scoring, and certificate generation.
      </Text>

      <Text className="text-lg font-semibold mt-4 mb-1">3. Cookies</Text>
      <Text className="text-base text-gray-700 mb-2">
        Our app may use cookies or similar technologies for analytics and personalization.
      </Text>

      <Text className="text-lg font-semibold mt-4 mb-1">4. Your Consent</Text>
      <Text className="text-base text-gray-700 mb-2">
        By signing up, you consent to our use of data in accordance with this policy.
      </Text>

      <Text className="text-base mt-6 text-gray-500">Last Updated: June 2025</Text>
    </ScrollView>
  );
};

export default TermsPrivacy;
