import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";

export function BooksTableSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Titulo</TableHead>
                    <TableHead>Autor del Libro</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Skeleton className="h-4 w-32" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-48" />
                        </TableCell>
                        <TableCell className="text-right">
                            <Skeleton className="h-5 w-20 ml-auto" />
                        </TableCell>
                        <TableCell className="text-right">
                            <Skeleton className="h-8 w-8 ml-auto" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
