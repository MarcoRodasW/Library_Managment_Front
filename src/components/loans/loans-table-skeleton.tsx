import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";

export function LoansTableSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-10"></TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha de Préstamo</TableHead>
                    <TableHead>Fecha de Devolución</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Cantidad de Libros</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Skeleton className="h-8 w-8" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-32" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-20" />
                        </TableCell>
                        <TableCell className="text-right">
                            <Skeleton className="h-4 w-8 ml-auto" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
