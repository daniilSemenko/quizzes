"use client";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {

    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <h1>😢 Упс, что-то пошло не так</h1>
            <p>{error.message}</p>
            <button onClick={reset}>Попробовать снова</button>
        </div>
    );
}
