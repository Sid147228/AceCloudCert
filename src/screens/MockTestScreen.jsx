import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import questions from '../data/mockQuestions';
import { useNavigation } from '@react-navigation/native';

const MockTestScreen = () => {
  const navigation = useNavigation();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [score, setScore] = useState(null);

  const handleSelect = (answer) => {
    setSelected({ ...selected, [current]: answer });
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      // Submit test
      const correct = questions.reduce((acc, q, i) => {
        return acc + (selected[i] === q.correctAnswer ? 1 : 0);
      }, 0);
      setScore(correct);
      navigation.navigate("Result", { score: correct, total: questions.length, selected });
    }
  };

  const currentQuestion = questions[current];

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-lg font-semibold">Q{current + 1}: {currentQuestion.question}</Text>
      {currentQuestion.options.map((opt, i) => (
        <TouchableOpacity
          key={i}
          className={`mt-3 p-3 rounded-xl border ${selected[current] === opt ? 'bg-blue-200 border-blue-500' : 'border-gray-300'}`}
          onPress={() => handleSelect(opt)}
        >
          <Text className="text-base">{opt}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        className="mt-6 bg-blue-600 py-3 px-5 rounded-xl"
        onPress={handleNext}
      >
        <Text className="text-white text-center text-lg">{current + 1 === questions.length ? 'Submit Test' : 'Next'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MockTestScreen;
