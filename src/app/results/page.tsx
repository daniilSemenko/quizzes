'use client';
import { useQuizStore } from '@/store/Quiz/quizStore';
import { Button, Card } from 'antd';
import { useRouter } from 'next/navigation';

export default function ResultsPage() {
    const { correctAnswers, wrongAnswers, resetQuiz } = useQuizStore();
    const router = useRouter();

    return (
        <Card title="Результаты викторины">
            <p>✅ Правильных ответов: {correctAnswers}</p>
            <p>❌ Неправильных ответов: {wrongAnswers}</p>
            <Button
                type="primary"
                onClick={() => {
                    resetQuiz();
                    router.push('/');
                }}
            >
                Начать заново
            </Button>
        </Card>
    );
}
