export type Question = {
    category: string;
    type: "multiple" | "boolean";
    difficulty: "easy" | "medium" | "hard";
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

export type QuizData = {
    response_code: number;
    results: Question[];
};