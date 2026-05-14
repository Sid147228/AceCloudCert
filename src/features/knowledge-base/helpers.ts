import { questionBank } from '@/data/questions';
import type { KnowledgeTopic, Question } from '@/types';

export type KnowledgeTopicFilters = {
  category: string;
  search: string;
};

export function getKnowledgeCategories(topics: readonly KnowledgeTopic[]): readonly string[] {
  return Array.from(new Set(topics.map((topic) => topic.category))).sort((a, b) => a.localeCompare(b));
}

export function filterKnowledgeTopics(
  topics: readonly KnowledgeTopic[],
  filters: KnowledgeTopicFilters
): readonly KnowledgeTopic[] {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return topics.filter((topic) => {
    const matchesCategory = filters.category === 'All' || topic.category === filters.category;
    const searchableText = [
      topic.title,
      topic.category,
      topic.summary,
      topic.practicalExample,
      ...topic.keyPoints
    ]
      .join(' ')
      .toLowerCase();
    const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
}

export function getRelatedQuestions(topic: KnowledgeTopic, questions: readonly Question[] = questionBank): readonly Question[] {
  return topic.relatedQuestionIds
    .map((questionId) => questions.find((question) => question.id === questionId))
    .filter((question): question is Question => Boolean(question));
}
