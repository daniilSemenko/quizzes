"use client";
import { Button, Card } from "antd";
import React from "react";
import {Question} from "@/types/quizTypes";

type Props = {
    question: Question;
    handleAnswer: (answer: string) => void;
};

export const QuestionCard: React.FC<Props> = ({ question, handleAnswer }) => {
    const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

    return (
        <Card title={question.category}>
            <p dangerouslySetInnerHTML={{ __html: question.question }} />
            {answers.map((answer) => (
                <Button key={answer} onClick={() => handleAnswer(answer)}>
                    {answer}
                </Button>
            ))}
        </Card>
    );
};
