import axios from "axios";
import {Question, QuizData} from "@/types/quizTypes";

const API_URL = "https://opentdb.com/api.php?amount=10";

export const fetchQuiz = async (): Promise<{ response_code: number; results: Question[]; categories: string[] }> => {
    try {
        const response = await axios.get<QuizData>(API_URL);

        if (response.data.response_code !== 0) {
            throw new Error(`Ошибка API: код ответа ${response.data.response_code}`);
        }

        const categories: string[] = Array.from(new Set(response.data.results.map((q) => q.category)));

        return { response_code: response.data.response_code, results: response.data.results, categories };
    } catch (error) {
        throw new Error("Не удалось загрузить вопросы. Попробуйте снова позже.");
    }
};


