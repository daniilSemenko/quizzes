import { create } from "zustand";
import { fetchCategories, fetchQuiz } from "@/services/triviaApi";
import { Question } from "@/types/quizTypes";

type QuizState = {
    categories: { id: number; name: string }[];
    questions: Question[];
    currentCategory: string | null;
    questionCount: number;
    currentIndex: number;
    correctAnswers: number;
    wrongAnswers: number;
    isLoading: boolean;
    fetchCategories: () => Promise<void>;
    fetchQuestions: (categoryId: number) => Promise<void>;
    startQuiz: (category: string, categoryId: number) => void;
    submitAnswer: (answer: string) => void;
    resetQuiz: () => void;
    setQuestionCount: (count: number) => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
    categories: [],
    questions: [],
    currentCategory: null,
    questionCount: 5,
    currentIndex: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    isLoading: false,

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

    // ✅ Выбор количества вопросов
    setQuestionCount: (count) => {
        set({ questionCount: Math.max(1, Math.min(count, 10)) });
    },

    submitAnswer: (answer) => {
        const { questions, currentIndex, correctAnswers, wrongAnswers } = get();
        const currentQuestion = questions[currentIndex];
        if (!currentQuestion) return;

        set({
            correctAnswers: currentQuestion.correct_answer === answer ? correctAnswers + 1 : correctAnswers,
            wrongAnswers: currentQuestion.correct_answer === answer ? wrongAnswers : wrongAnswers + 1,
            currentIndex: currentIndex + 1,
        });
    },

    resetQuiz: () => {
        set({ currentCategory: null, currentIndex: 0, correctAnswers: 0, wrongAnswers: 0, questions: [] });
    },
}));
