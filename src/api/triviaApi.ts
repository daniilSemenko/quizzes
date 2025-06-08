import axios from 'axios';
import { Question } from '@/store/Quiz/quizTypes';
import { API_BASE } from '@/api/httpClient';

export const fetchCategories = async (): Promise<{ id: number; name: string }[]> => {
    try {
        const response = await axios.get(`${API_BASE}/api_category.php`);
        return response.data.trivia_categories.map((category: { id: number; name: string }) => ({
            id: category.id,
            name: category.name,
        }));
    } catch (error) {
        return Promise.reject(error);
    }
};

export const fetchQuiz = async (
    categoryId: number,
    amount: number
): Promise<{ response_code: number; results: Question[] }> => {
    try {
        const response = await axios.get(
            `${API_BASE}/api.php?amount=${amount}&category=${categoryId}&difficulty=medium&type=multiple`
        );
        return response.data;
    } catch (error) {
        throw new Error('Не удалось загрузить вопросы. Попробуйте снова позже.');
    }
};
