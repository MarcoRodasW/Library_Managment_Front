import { queryOptions } from "@tanstack/react-query";
import { BASE_API_URL } from "./common";
import { z } from "zod";

export interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    isAvailable: boolean;
}

export async function GetBooks(): Promise<Book[]> {
    const response = await fetch(`${BASE_API_URL}/book`, {
        method: "GET",
    });
    const data: Book[] = await response.json();
    return data;
}

export const GetBooksQueryOptions = queryOptions({
    queryKey: ["books"],
    queryFn: () => GetBooks(),
});

export const CreateBookSchema = z.object({
    title: z
        .string()
        .min(1, "Es requerido ingresar un nombre")
        .max(50, "Maximo 50 caracteres para el titulo"),
    author: z
        .string()
        .min(1, "Es requerido ingresar un autor")
        .max(50, "Maximo 50 caracteres para el autor"),
    description: z
        .string()
        .max(255, "Maximo 255 caracteres para la descripcion")
        .nullable(),
});
export type CreateBookInput = z.infer<typeof CreateBookSchema>;

export async function CreateBook(payload: CreateBookInput): Promise<Book> {
    const response = await fetch(`${BASE_API_URL}/book`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const data: Book = await response.json();
    return data;
}

export async function DeleteBook(id: number): Promise<void> {
    await fetch(`${BASE_API_URL}/book/${id}`, {
        method: "DELETE",
    });
}
