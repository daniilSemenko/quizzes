'use client';
import { Flex, Spin } from 'antd';
import { styles } from '@/components/Loader/Loader.style';

export const Loader = () => (
    <Flex justify={'center'} align="center" style={styles.containerLoader}>
        <Spin size="large" />
    </Flex>
);
