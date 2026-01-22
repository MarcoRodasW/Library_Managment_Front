import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GetAllLoansOptions, type Loan } from "@/lib/api/loans";
import { LoanStatus } from "@/lib/api/common";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ChevronDownIcon } from "lucide-react";

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

function LoanRow({ loan }: { loan: Loan }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <ChevronDownIcon
                            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                    </Button>
                </TableCell>
                <TableCell>{loan.client.name}</TableCell>
                <TableCell>
                    {new Date(loan.loan_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                    {new Date(loan.due_date).toLocaleDateString()}
                </TableCell>
                <TableCell>{getLoanStatusBadge(loan.loanStatus)}</TableCell>
                <TableCell className="text-right">
                    {loan.loanDetails.length}
                </TableCell>
            </TableRow>
            {isOpen && (
                <TableRow className="bg-muted/50">
                    <TableCell colSpan={6}>
                        <div className="py-2">
                            <p className="font-medium mb-2">Libros prestados:</p>
                            <ul className="space-y-1 pl-4">
                                {loan.loanDetails.map((detail) => (
                                    <li key={detail.id} className="text-sm">
                                        <span className="font-medium">
                                            {detail.book.title}
                                        </span>
                                        {" - "}
                                        <span className="text-muted-foreground">
                                            {detail.book.author}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
}

export function LoansTable() {
    const { data } = useSuspenseQuery(GetAllLoansOptions);

    return (
        <Table>
            <TableCaption>Lista de préstamos registrados.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-10"></TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha de Préstamo</TableHead>
                    <TableHead>Fecha de Devolución</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">
                        Cantidad de Libros
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((loan) => (
                    <LoanRow key={loan.id} loan={loan} />
                ))}
            </TableBody>
        </Table>
    );
}
