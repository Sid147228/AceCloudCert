import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import questions from '../data/mockQuestions';

const ResultScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { score, total, selected } = route.params;

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-center text-green-700">🎉 You scored {score} out of {total}</Text>

      <Text className="text-lg mt-6 mb-2 font-semibold">Review Answers:</Text>
      {questions.map((q, i) => (
        <View key={i} className="mb-4 p-3 border rounded-xl">
          <Text className="font-semibold">Q{i + 1}: {q.question}</Text>
          <Text>Your Answer: {selected[i] || 'Not answered'}</Text>
          <Text className="text-green-700">Correct Answer: {q.correctAnswer}</Text>
        </View>
      ))}

      <TouchableOpacity
        className="mt-6 bg-blue-600 py-3 rounded-xl"
        onPress={() => navigation.navigate("Certificates")}
      >
        <Text className="text-white text-center">Generate Certificate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ResultScreen;
