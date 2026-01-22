import z from "zod";
import { queryOptions } from "@tanstack/react-query";
import { BASE_API_URL } from "./common";

export interface Client {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

export async function GetClients(): Promise<Client[]> {
    const response = await fetch(`${BASE_API_URL}/client`);
    if (!response.ok) {
        throw new Error(`Failed to fetch clients: ${response.status}`);
    }
    const data = await response.json();
    return data as Client[];
}

export const GetClientsQueryOptions = queryOptions({
    queryKey: ["clients"],
    queryFn: () => GetClients(),
});

export const CreateClientSchema = z.object({
    name: z.string().min(1, "Es requerido un nombre para el cliente").max(100),
    email: z.string().email("Email inválido"),
});
export type CreateClientInput = z.infer<typeof CreateClientSchema>;

export async function CreateClient(input: CreateClientInput): Promise<Client> {
    const response = await fetch(`${BASE_API_URL}/client`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });
    if (!response.ok) {
        throw new Error(`Failed to create client: ${response.status}`);
    }
    const data = await response.json();
    return data as Client;
}
