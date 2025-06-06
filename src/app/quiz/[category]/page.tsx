"use client";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/quizStore";
import { useEffect } from "react";
import { QuestionCard } from "@/components/QuestionCard/QuestionCard";

export default function QuizPage({ params }: { params: { category: string } }) {
    const { questions, currentCategory, currentIndex, submitAnswer } = useQuizStore();
    const router = useRouter();
    const currentQuestion = questions[currentIndex];

    useEffect(() => {
        if (questions.length > 0 && currentIndex >= questions.length) {
            router.push("/results");
        }
    }, [questions, currentIndex]);


    if (!currentQuestion) return null;

    return <QuestionCard question={currentQuestion} handleAnswer={submitAnswer} />;
}
