import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { DeleteBook, GetBooksQueryOptions } from "@/lib/api/books";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";

export function BooksTable() {
    const queryClient = useQueryClient();
    const { data } = useSuspenseQuery(GetBooksQueryOptions);

    const { mutate: deleteBook, isPending } = useMutation({
        mutationFn: (id: number) => DeleteBook(id),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: GetBooksQueryOptions.queryKey,
            });
        },
    });

    return (
        <Table>
            <TableCaption>Lista de libros registrados.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Titulo</TableHead>
                    <TableHead>Autor del Libro</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((book) => (
                    <TableRow key={book.id}>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell className="text-left">
                            {book.description}
                        </TableCell>
                        <TableCell className="text-right">
                            {book.isAvailable ? (
                                <Badge variant="default">Disponible</Badge>
                            ) : (
                                <Badge variant="destructive">
                                    No disponible
                                </Badge>
                            )}
                        </TableCell>
                        <TableCell className="text-right">
                            <Button
                                variant="destructive"
                                size="icon"
                                disabled={isPending}
                                onClick={() => deleteBook(book.id)}
                            >
                                <TrashIcon className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
