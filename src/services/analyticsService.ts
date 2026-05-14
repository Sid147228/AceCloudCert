import { calculateResultInsights, calculateTestAnalytics } from '@/features/tests';
import type { ResultInsights, TestAnalytics, TestAttempt } from '@/features/tests';
import { testService } from './testService';

export type AnalyticsService = {
  getResultInsights: (attempt: TestAttempt) => ResultInsights;
  getTestAnalytics: (userId: string) => Promise<TestAnalytics>;
};

export const analyticsService: AnalyticsService = {
  getResultInsights(attempt) {
    return calculateResultInsights(attempt);
  },

  async getTestAnalytics(userId) {
    const attempts = await testService.listAttempts(userId);
    return calculateTestAnalytics(attempts);
  }
};
