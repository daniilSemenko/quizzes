'use client';
import { Spin } from 'antd';

export const Loader = () => (
    <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
        <Spin size="large" />
    </div>
);
