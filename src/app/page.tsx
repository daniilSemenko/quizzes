"use client";
import { useEffect } from "react";
import { useQuizStore } from "@/store/quizStore";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader/Loader";
import { CategoryItem } from "@/components/CategoryItem/CategoryItem";
import { Flex, Typography, InputNumber } from "antd";

export default function HomePage() {
    const { fetchCategories, categories, isLoading, startQuiz, setQuestionCount, questionCount } = useQuizStore();
    const router = useRouter();

    useEffect(() => {
        fetchCategories();
    }, []);

    if (isLoading) return <Loader />;

    return (
        <Flex vertical gap={16}>
            <Typography.Title>Выберите категорию:</Typography.Title>
            <Flex>
                <p>Количество вопросов:</p>
                <InputNumber
                    min={1}
                    max={10}
                    defaultValue={questionCount}
                    onChange={(value) => setQuestionCount(value || 5)}
                />
            </Flex>
            <>
            {categories.map(({ id, name }) => (
                <CategoryItem key={id} name={name} onSelect={() => {
                    startQuiz(name, id);
                    router.push(`/quiz/${name.toLowerCase()}`);
                }} />
            ))}
            </>
        </Flex>
    );
}
