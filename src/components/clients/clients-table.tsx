import { useSuspenseQuery } from "@tanstack/react-query";
import { GetClientsQueryOptions } from "@/lib/api/clients";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { ClientLoansDialog } from "./client-loans-dialog";
import { UsersIcon } from "lucide-react";

export function ClientsTable() {
    const { data } = useSuspenseQuery(GetClientsQueryOptions);

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 border rounded-lg bg-muted/20">
                <div className="rounded-full bg-muted p-4 mb-4">
                    <UsersIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-1">No hay clientes registrados</h3>
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                    Comienza agregando tu primer cliente usando el botón "Crear cliente".
                </p>
            </div>
        );
    }

    return (
        <Table>
            <TableCaption>Lista de clientes registrados.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Fecha de Registro</TableHead>
                    <TableHead className="text-right">Ver Prestamos</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((client) => (
                    <TableRow key={client.id}>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>
                            {new Date(client.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                            <ClientLoansDialog client={client} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
