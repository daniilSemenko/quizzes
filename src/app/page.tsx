"use client";
import { useEffect } from "react";
import { useQuizStore } from "@/store/quizStore";
import { useRouter } from "next/navigation";
import {Loader} from "@/components/Loader/Loader";
import {CategoryItem} from "@/components/CategoryItem/CategoryItem";
import {Flex, Typography} from "antd";

export default function HomePage() {
    const { fetchData, categories, isLoading, startQuiz } = useQuizStore();
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) return <Loader />;

    return (
        <Flex vertical>
            <Typography.Title>Выберите категорию:</Typography.Title>
            <Flex vertical gap={16}>
                <>
            {categories.map((category) => (
                <CategoryItem key={category} name={category} onSelect={() => {
                    startQuiz(category);
                    router.push(`/quiz/${category.toLowerCase()}`);                }} />
            ))}
                </>
            </Flex>
        </Flex>
    );
}
