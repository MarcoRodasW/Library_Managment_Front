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

export function ClientsTable() {
    const { data } = useSuspenseQuery(GetClientsQueryOptions);
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
