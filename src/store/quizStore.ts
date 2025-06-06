import { create } from "zustand";
import { Question } from "@/types/quizTypes";
import { fetchQuiz } from "@/services/triviaApi";

type QuizState = {
    questionsByCategory: Record<string, Question[]>;
    categories: string[];
    currentCategory: string | null;
    currentIndex: number;
    correctAnswers: number;
    wrongAnswers: number;
    isLoading: boolean;
    fetchData: () => Promise<void>;
    startQuiz: (category: string) => void;
    submitAnswer: (answer: string) => void;
    resetQuiz: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
    questionsByCategory: {},
    categories: [],
    currentCategory: null,
    currentIndex: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    isLoading: false,

    fetchData: async () => {
        set({ isLoading: true, currentCategory: null });

        try {
            const data = await fetchQuiz();

            if (!data.results || data.results.length === 0) {
                throw new Error("Вопросы не найдены, попробуйте позже.");
            }

            const questionsByCategory: Record<string, Question[]> = {};
            data.results.forEach((q) => {
                const cleanCategory = q.category.replace(/\s/g, "-");
                if (!questionsByCategory[cleanCategory]) {
                    questionsByCategory[cleanCategory] = [];
                }
                questionsByCategory[cleanCategory].push(q);
            });

            set({
                categories: Object.keys(questionsByCategory),
                questionsByCategory,
            });
        } catch (error) {
            alert(error.message);
        } finally {
            set({ isLoading: false });
        }
    },




    startQuiz: (category) => {
        const { questionsByCategory } = get();

        if (!questionsByCategory[category] || questionsByCategory[category].length === 0) {
            alert("Ошибка: вопросы для этой категории не загружены.");
            return;
        }

        set({
            currentCategory: category,
            currentIndex: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
        });
    },


    submitAnswer: (answer: string) => {
        const { questionsByCategory, currentCategory, currentIndex, correctAnswers, wrongAnswers } = get();
        if (!currentCategory) return;

        const currentQuestion = questionsByCategory[currentCategory][currentIndex];
        const isCorrect = currentQuestion.correct_answer === answer;

        set({
            correctAnswers: isCorrect ? correctAnswers + 1 : correctAnswers,
            wrongAnswers: isCorrect ? wrongAnswers : wrongAnswers + 1,
            currentIndex: currentIndex + 1,
        });
    },

    resetQuiz: () => {
        set({
            currentCategory: null,
            currentIndex: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
        });
    },
}));
