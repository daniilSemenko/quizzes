import { useState } from "react";
import {Button, Flex, Typography} from "antd";
import { useQuizStore } from "@/store/quizStore";
import { Question } from "@/types/quizTypes";
import he from "he";

export function QuestionCard({ question }: { question: Question }) {
    const { submitAnswer } = useQuizStore();
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answered, setAnswered] = useState(false);

    const handleSelect = (answer: string) => {
        setSelectedAnswer(answer);
        setAnswered(true);
    };

    return (
        <div>
            <Typography.Title level={2}>{he.decode(question.question)}</Typography.Title>
            <Flex gap={6} wrap={"wrap"}>
                <>
            {question.incorrect_answers.concat(question.correct_answer).map((answer: string) => (
                <Button key={answer} onClick={() => handleSelect(answer)} disabled={answered}>
                    {he.decode(answer)}
                </Button>
            ))}
                </>
            </Flex>
            {answered && (
                <div>
                    {selectedAnswer === question.correct_answer ? (
                        <p>✅ Верно!</p>
                    ) : (
                        <p>❌ Неверно! Правильный ответ: {question.correct_answer}</p>
                    )}
                    <Button type="primary" onClick={() => {
                        submitAnswer(selectedAnswer!);
                        setAnswered(false);
                        setSelectedAnswer(null);
                    }}>
                        Далее
                    </Button>
                </div>
            )}
        </div>
    );
}
