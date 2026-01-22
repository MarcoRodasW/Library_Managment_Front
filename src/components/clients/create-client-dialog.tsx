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
    CreateClient,
    CreateClientSchema,
    GetClientsQueryOptions,
    type CreateClientInput,
} from "@/lib/api/clients";
import type z from "zod";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function CreateClientDialog() {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const formId = useId();

    const form = useForm<z.infer<typeof CreateClientSchema>>({
        defaultValues: {
            name: "",
            email: "",
        },
        resolver: zodResolver(CreateClientSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (payload: CreateClientInput) => CreateClient(payload),
        onSuccess: () => {
            form.reset();
            setIsOpen(false);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: GetClientsQueryOptions.queryKey,
            });
        },
    });

    function onSubmit(data: z.infer<typeof CreateClientSchema>) {
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
                    <Button variant={"outline"}>Crear cliente</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear cliente</DialogTitle>
                        <DialogDescription>
                            Crear un nuevo registro de cliente para la biblioteca.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-client-name">
                                        Nombre del cliente
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-client-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Indicar el nombre del cliente"
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
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-client-email">
                                        Email del cliente
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-client-email"
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Indicar el email del cliente"
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
