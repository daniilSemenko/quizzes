"use client";
import { useEffect } from "react";
import { useQuizStore } from "@/store/quizStore";
import { useRouter } from "next/navigation";
import {Loader} from "@/components/Loader/Loader";
import {CategoryItem} from "@/components/CategoryItem/CategoryItem";
import {Typography} from "antd";

export default function HomePage() {
    const { fetchData, categories, isLoading, startQuiz } = useQuizStore();
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) return <Loader />;

    return (
        <div>
            <Typography.Title level={5}>Выберите категорию:</Typography.Title>
            {categories.map((category) => (
                <CategoryItem key={category} name={category} onSelect={() => {
                    startQuiz(category);
                    router.push(`/quiz/${category.toLowerCase()}`);                }} />
            ))}
        </div>
    );
}
