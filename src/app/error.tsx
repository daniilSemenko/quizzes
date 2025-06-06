"use client";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error("Произошла ошибка:", error);
    }, [error]);

    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <h1>😢 Упс, что-то пошло не так</h1>
            <p>{error.message}</p>
            <button onClick={reset}>Попробовать снова</button>
        </div>
    );
}
