import { useId, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Controller, useForm } from "react-hook-form";
import {
    CreateLoan,
    CreateLoanSchema,
    GetAllLoansOptions,
    type CreateLoanInput,
} from "@/lib/api/loans";
import { GetBooksQueryOptions } from "@/lib/api/books";
import { GetClientsQueryOptions } from "@/lib/api/clients";
import type z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {
    useMutation,
    useQueryClient,
    useSuspenseQuery,
} from "@tanstack/react-query";
import { PlusIcon, XIcon } from "lucide-react";
import { Badge } from "../ui/badge";

export function CreateLoanDialog() {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const formId = useId();

    const { data: clients } = useSuspenseQuery(GetClientsQueryOptions);
    const { data: books } = useSuspenseQuery(GetBooksQueryOptions);

    const availableBooks = books.filter((book) => book.isAvailable);

    const form = useForm<z.infer<typeof CreateLoanSchema>>({
        defaultValues: {
            clientId: 0,
            loan_date: new Date(),
            bookIds: [],
        },
        resolver: zodResolver(CreateLoanSchema),
    });

    const selectedBookIds = form.watch("bookIds");

    const { mutate, isPending } = useMutation({
        mutationFn: async (payload: CreateLoanInput) => CreateLoan(payload),
        onSuccess: () => {
            form.reset();
            setIsOpen(false);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: GetAllLoansOptions.queryKey,
            });
            queryClient.invalidateQueries({
                queryKey: GetBooksQueryOptions.queryKey,
            });
        },
    });

    function onSubmit(data: z.infer<typeof CreateLoanSchema>) {
        mutate(data);
    }

    function addBook(bookId: number) {
        const current = form.getValues("bookIds");
        if (!current.includes(bookId)) {
            form.setValue("bookIds", [...current, bookId], {
                shouldValidate: true,
            });
        }
    }

    function removeBook(bookId: number) {
        const current = form.getValues("bookIds");
        form.setValue(
            "bookIds",
            current.filter((id) => id !== bookId),
            { shouldValidate: true },
        );
    }

    const unselectedBooks = availableBooks.filter(
        (book) => !selectedBookIds.includes(book.id),
    );

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <form
                aria-disabled={isPending}
                id={formId}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <DialogTrigger asChild>
                    <Button variant={"outline"}>Crear préstamo</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Crear préstamo</DialogTitle>
                        <DialogDescription>
                            Registrar un nuevo préstamo de libros.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Controller
                            name="clientId"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Cliente</FieldLabel>
                                    <Select
                                        value={
                                            field.value
                                                ? String(field.value)
                                                : ""
                                        }
                                        onValueChange={(value) =>
                                            field.onChange(Number(value))
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Seleccionar cliente" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {clients.map((client) => (
                                                <SelectItem
                                                    key={client.id}
                                                    value={String(client.id)}
                                                >
                                                    {client.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="bookIds"
                            control={form.control}
                            render={({ fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>
                                        Libros disponibles para prestamo
                                    </FieldLabel>
                                    {selectedBookIds.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {selectedBookIds.map((bookId) => {
                                                const book = books.find(
                                                    (b) => b.id === bookId,
                                                );
                                                return (
                                                    <Badge
                                                        key={bookId}
                                                        variant="secondary"
                                                        className="flex items-center gap-1 pr-1"
                                                    >
                                                        {book?.title}
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-4 w-4 hover:bg-destructive hover:text-destructive-foreground"
                                                            onClick={() =>
                                                                removeBook(
                                                                    bookId,
                                                                )
                                                            }
                                                        >
                                                            <XIcon className="h-3 w-3" />
                                                        </Button>
                                                    </Badge>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {unselectedBooks.length > 0 ? (
                                        <div className="border rounded-md max-h-48 overflow-y-auto">
                                            {unselectedBooks.map((book) => (
                                                <div
                                                    key={book.id}
                                                    className="flex items-center justify-between p-2 hover:bg-muted/50 border-b last:border-b-0"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium">
                                                            {book.title}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {book.author}
                                                        </span>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            addBook(book.id)
                                                        }
                                                    >
                                                        <PlusIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            {availableBooks.length === 0
                                                ? "No hay libros disponibles"
                                                : "Todos los libros disponibles han sido seleccionados"}
                                        </p>
                                    )}

                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <DialogFooter>
                        <Field orientation="horizontal">
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                form={formId}
                                disabled={isPending}
                            >
                                Guardar
                            </Button>
                        </Field>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
