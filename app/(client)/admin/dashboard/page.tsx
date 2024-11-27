import { notFound } from 'next/navigation';
import React from 'react'

interface dataTypes {
    data?: "tool" | "ingredient" | "recipe" | "user";
}

const isValid = (string: string) => {
    const validQueries = ["tool", "ingredient", "recipe", "user"];
    return string && validQueries.includes(string);
}

const Dashboard = ({ searchParams }: { searchParams: { data?: "tool" | "ingredient" | "recipe" | "user" } }) => {
    const data = searchParams.data;

    if (!data) return notFound();
    
    return (
        <div>
            <p>Page</p>
            <p>Data: {data}</p>
            <p>Validity: {isValid(data) ? "Valid" : "Invalid" }</p>
        </div>
    )
}

export default Dashboard