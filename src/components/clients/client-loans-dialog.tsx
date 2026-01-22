import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { GetLoanByClientId, type Loan } from "@/lib/api/loans";
import { LoanStatus } from "@/lib/api/common";
import type { Client } from "@/lib/api/clients";
import { Badge } from "../ui/badge";
import { BookOpenIcon, ChevronDownIcon, EyeIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

function getLoanStatusBadge(status: number) {
    switch (status) {
        case 0:
            return <Badge variant="secondary">{LoanStatus.Pending}</Badge>;
        case 1:
            return <Badge variant="default">{LoanStatus.Completed}</Badge>;
        case 2:
            return <Badge variant="destructive">{LoanStatus.Late}</Badge>;
        default:
            return <Badge variant="outline">Desconocido</Badge>;
    }
}

function LoanItem({ loan }: { loan: Loan }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border rounded-md">
            <div
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                            Realizado el{" "}
                            {new Date(loan.loan_date).toLocaleDateString()}
                        </span>
                        {getLoanStatusBadge(loan.loanStatus)}
                    </div>
                    <span className="text-xs text-muted-foreground">
                        Vence: {new Date(loan.due_date).toLocaleDateString()}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline">
                        {loan.loanDetails.length} libro(s)
                    </Badge>
                    <ChevronDownIcon
                        className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                </div>
            </div>
            {isOpen && (
                <div className="border-t p-3 bg-muted/30">
                    <p className="text-sm font-medium mb-2">Libros:</p>
                    <ul className="space-y-1">
                        {loan.loanDetails.map((detail) => (
                            <li
                                key={detail.id}
                                className="text-sm flex items-center gap-2"
                            >
                                <BookOpenIcon className="h-3 w-3 text-muted-foreground" />
                                <span className="font-medium">
                                    {detail.book.title}
                                </span>
                                <span className="text-muted-foreground">
                                    - {detail.book.author}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

function LoansListSkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="border rounded-md p-3">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                        <Skeleton className="h-5 w-20" />
                    </div>
                </div>
            ))}
        </div>
    );
}

interface ClientLoansDialogProps {
    client: Client;
}

export function ClientLoansDialog({ client }: ClientLoansDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    const { data: loans, isLoading } = useQuery({
        queryKey: ["loans", "client", client.id],
        queryFn: () => GetLoanByClientId(client.id),
        enabled: isOpen,
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <EyeIcon className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle>Préstamos de {client.name}</DialogTitle>
                    <DialogDescription>
                        Historial de préstamos del cliente.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                    {isLoading ? (
                        <LoansListSkeleton />
                    ) : loans && loans.length > 0 ? (
                        loans.map((loan) => (
                            <LoanItem key={loan.id} loan={loan} />
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                            Este cliente no tiene préstamos registrados.
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
