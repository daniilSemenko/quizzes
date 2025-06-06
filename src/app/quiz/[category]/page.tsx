"use client";
import { useRouter } from "next/navigation";
import {QuestionCard} from "@/components/QuestionCard/QuestionCard";
import {useQuizStore} from "@/store/quizStore";
import {useEffect} from "react";

export default function QuizPage({ params }: { params: { category: string } }) {
    const { questionsByCategory, currentCategory, currentIndex, submitAnswer } = useQuizStore();
    const router = useRouter();

    if (!currentCategory) {
        router.push("/");
        return null;
    }

    const questions = questionsByCategory[currentCategory];
    const currentQuestion = questions[currentIndex];

    useEffect(() => {
        if (!currentQuestion) {
            router.push("/results");
        }
    }, [currentQuestion]);

    if (!currentQuestion) return null;

    return <QuestionCard question={currentQuestion} handleAnswer={submitAnswer} />;
}
