import { queryOptions } from "@tanstack/react-query";
import type { Book } from "./books";
import type { Client } from "./clients";
import { BASE_API_URL } from "./common";
import z from "zod";

export interface Loan {
    id: number;
    clientId: number;
    client: Client;
    loan_date: string;
    due_date: string;
    loanStatus: number;
    created_at: string;
    loanDetails: LoanDetail[];
}

export interface LoanDetail {
    id: number;
    loanId: number;
    bookId: number;
    book: Book;
}

export async function GetAllloans(): Promise<Loan[]> {
    const response = await fetch(`${BASE_API_URL}/loan`);
    if (!response.ok) {
        throw new Error(`Failed to fetch loans: ${response.status}`);
    }
    const data = await response.json();
    return data as Loan[];
}

export const GetAllLoansOptions = queryOptions({
    queryKey: ["loans"],
    queryFn: () => GetAllloans(),
});

export const CreateLoanSchema = z.object({
    clientId: z.number().min(1, "Es requerido seleccionar al cliente"),
    loan_date: z.date(),
    bookIds: z
        .array(z.number().min(1, "Es requerido seleccionar al menos un libro"))
        .min(1, "Es requerido seleccionar al menos un libro"),
});
export type CreateLoanInput = z.infer<typeof CreateLoanSchema>;

export const CreateLoan = async (payload: CreateLoanInput) => {
    const response = await fetch(`${BASE_API_URL}/loan`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        throw new Error(`Failed to create loan: ${response.status}`);
    }
    const data = await response.json();
    return data as Loan;
};

export async function GetLoanByClientId(clientId: number): Promise<Loan[]> {
    const response = await fetch(`${BASE_API_URL}/loan/client/${clientId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch loans: ${response.status}`);
    }
    const data = await response.json();
    return data as Loan[];
}
