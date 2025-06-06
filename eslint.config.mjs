import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default [
    ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:prettier/recommended'), // ✅ Добавляем Prettier
    {
        rules: {
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-vars': ['error'],
            'no-console': 'warn',
        },
    },
];
