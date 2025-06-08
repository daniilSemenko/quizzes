import { useState } from 'react';
import { Button, Flex, Typography } from 'antd';
import { useQuizStore } from '@/store/Quiz/quizStore';
import { Question } from '@/store/Quiz/quizTypes';
import he from 'he';

export function QuestionCard({ question }: { question: Question }) {
    const { submitAnswer } = useQuizStore();
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const hasAnswered = selectedAnswer !== null;

    const handleSelect = (answer: string) => {
        setSelectedAnswer(answer);
    };

    return (
        <div>
            <Typography.Title level={2}>{he.decode(question.question)}</Typography.Title>
            <Flex gap={6} wrap={'wrap'}>
                <>
                    {question.incorrect_answers
                        .concat(question.correct_answer)
                        .map((answer: string) => (
                            <Button
                                key={answer}
                                onClick={() => handleSelect(answer)}
                                disabled={hasAnswered}
                            >
                                {he.decode(answer)}
                            </Button>
                        ))}
                </>
            </Flex>
            {hasAnswered && (
                <div>
                    {selectedAnswer === question.correct_answer ? (
                        <p>✅ Верно!</p>
                    ) : (
                        <p>❌ Неверно! Правильный ответ: {question.correct_answer}</p>
                    )}
                    <Button
                        type="primary"
                        onClick={() => {
                            submitAnswer(selectedAnswer!);
                            setSelectedAnswer(null);
                        }}
                    >
                        Далее
                    </Button>
                </div>
            )}
        </div>
    );
}
