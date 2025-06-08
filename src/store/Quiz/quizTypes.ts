export type Question = {
    category: string;
    type: 'multiple' | 'boolean';
    difficulty: 'easy' | 'medium' | 'hard';
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

export type QuizState = {
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
