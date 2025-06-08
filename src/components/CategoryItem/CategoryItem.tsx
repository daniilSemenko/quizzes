'use client';
import { Card, List } from 'antd';
import React from 'react';

type Props = {
    name: string;
    onSelect: () => void;
};

export const CategoryItem: React.FC<Props> = ({ name, onSelect }) => {
    return (
        <List.Item onClick={onSelect}>
            <Card hoverable style={{ width: '100%' }}>
                <h3>{name}</h3>
            </Card>
        </List.Item>
    );
};
