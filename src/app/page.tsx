'use client';
import React, { useEffect } from 'react';
import { useQuizStore } from '@/store/Quiz/quizStore';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/Loader/Loader';
import { CategoryItem } from '@/components/CategoryItem/CategoryItem';
import { Flex, Typography, InputNumber, List } from 'antd';

const DEFAULT_QUESTIONS = 5;

export default function HomePage() {
    const { fetchCategories, categories, isLoading, startQuiz, setQuestionCount, questionCount } =
        useQuizStore();
    const router = useRouter();

    useEffect(() => {
        fetchCategories();
    }, []);

    if (isLoading) return <Loader />;

    return (
        <Flex vertical gap={16}>
            <Typography.Title>Выберите категорию:</Typography.Title>
            <Flex gap={6} align={'center'}>
                <Typography.Text type={'secondary'}>Количество вопросов:</Typography.Text>
                <InputNumber
                    min={1}
                    max={10}
                    defaultValue={questionCount}
                    onChange={(value) => setQuestionCount(Number(value) ?? DEFAULT_QUESTIONS)}
                />
            </Flex>
            <List
                dataSource={categories}
                renderItem={({ id, name }: { id: number; name: string }) => (
                    <CategoryItem
                        key={id}
                        name={name}
                        onSelect={() => {
                            startQuiz(name, id);
                            router.push(`/quiz/${name.toLowerCase()}`);
                        }}
                    />
                )}
            />
        </Flex>
    );
}
