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
import { BookOpenIcon, TrashIcon } from "lucide-react";

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

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 border rounded-lg bg-muted/20">
                <div className="rounded-full bg-muted p-4 mb-4">
                    <BookOpenIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-1">No hay libros registrados</h3>
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                    Comienza agregando tu primer libro a la biblioteca usando el botón "Crear libro".
                </p>
            </div>
        );
    }

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
