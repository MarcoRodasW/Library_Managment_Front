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
    CreateBook,
    CreateBookSchema,
    GetBooksQueryOptions,
    type CreateBookInput,
} from "@/lib/api/books";
import type z from "zod";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { InputGroup, InputGroupTextarea } from "../ui/input-group";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function CreateBookDialog() {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const formId = useId();

    const form = useForm<z.infer<typeof CreateBookSchema>>({
        defaultValues: {
            author: "",
            description: null,
            title: "",
        },
        resolver: zodResolver(CreateBookSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (payload: CreateBookInput) => CreateBook(payload),
        onSuccess: () => {
            form.reset();
            setIsOpen(false);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: GetBooksQueryOptions.queryKey,
            });
        },
    });

    function onSubmit(data: z.infer<typeof CreateBookSchema>) {
        mutate(data);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <form
                aria-disabled={isPending}
                id={formId}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <DialogTrigger asChild>
                    <Button variant={"outline"}>Crear libro</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear libro</DialogTitle>
                        <DialogDescription>
                            Crear un nuevo registro de libro para la biblioteca.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Titulo del libro
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Indicar el titulo del libro"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="author"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Autor del libro
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Indicar quien es el autor del libro"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-description">
                                        Description
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            value={field.value ?? ""}
                                            id="form-rhf-demo-description"
                                            placeholder="Una breve descripción del libro"
                                            rows={6}
                                            className="min-h-24 resize-none"
                                            aria-invalid={fieldState.invalid}
                                        />
                                    </InputGroup>
                                    <FieldDescription>
                                        Descripción del libro, es opcional.
                                    </FieldDescription>
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
