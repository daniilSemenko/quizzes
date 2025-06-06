'use client';
import { Card } from 'antd';
import React from 'react';

type Props = {
    name: string;
    onSelect: () => void;
};

export const CategoryItem: React.FC<Props> = ({ name, onSelect }) => {
    return (
        <Card hoverable onClick={onSelect}>
            <h3>{name}</h3>
        </Card>
    );
};
