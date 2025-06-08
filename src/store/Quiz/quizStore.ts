import { create } from 'zustand';
import { fetchCategories, fetchQuiz } from '@/api/triviaApi';
import { QuizState } from '@/store/Quiz/quizTypes';

const initialState = {
    categories: [],
    questions: [],
    currentCategory: null,
    questionCount: 5,
    currentIndex: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    isLoading: false,
};

export const useQuizStore = create<QuizState>((set, get) => ({
    ...initialState,
    fetchCategories: async () => {
        set({ isLoading: true });
        try {
            const categories = await fetchCategories();
            set({ categories });
        } catch (error) {
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    },

    fetchQuestions: async (categoryId: number) => {
        set({ isLoading: true });

        try {
            const { results } = await fetchQuiz(categoryId, get().questionCount);
            if (!results || results.length === 0) {
                throw new Error('Ошибка: вопросы не загружены');
            }

            set({ questions: results });
        } catch (error) {
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    },

    startQuiz: (category, categoryId) => {
        set({ currentCategory: category, currentIndex: 0, correctAnswers: 0, wrongAnswers: 0 });
        get().fetchQuestions(categoryId);
    },

    setQuestionCount: (count) => {
        set({ questionCount: Math.max(1, Math.min(count, 10)) });
    },

    submitAnswer: (answer) => {
        const { questions, currentIndex, correctAnswers, wrongAnswers } = get();
        const currentQuestion = questions[currentIndex];
        if (!currentQuestion) return;

        const isCorrect = currentQuestion.correct_answer === answer;

        set({
            correctAnswers: isCorrect ? correctAnswers + 1 : correctAnswers,
            wrongAnswers: isCorrect ? wrongAnswers : wrongAnswers + 1,
            currentIndex: currentIndex + 1,
        });
    },

    resetQuiz: () => {
        set(initialState);
    },
}));
