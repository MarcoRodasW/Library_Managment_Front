import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Suspense } from "react";
import { BooksTable } from "./components/books/books-table";
import { BooksTableSkeleton } from "./components/books/books-table-skeleton";
import { CreateBookDialog } from "./components/books/create-book-dialog";
import { ClientsTable } from "./components/clients/clients-table";
import { ClientsTableSkeleton } from "./components/clients/clients-table-skeleton";
import { CreateClientDialog } from "./components/clients/create-client-dialog";
import { LoansTable } from "./components/loans/loans-table";
import { LoansTableSkeleton } from "./components/loans/loans-table-skeleton";
import { CreateLoanDialog } from "./components/loans/create-loan-dialog";

const TABS_LIST = {
    Books: "Libros",
    Clientes: "Clientes",
    Loans: "Préstamos",
    Payments: "Pagos",
} as const;

function App() {
    return (
        <div className="min-h-screen w-full flex flex-col bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex justify-between items-center py-4">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">
                            Registro de Biblioteca
                        </h1>
                    </nav>
                </div>
            </header>
            <main className="flex-1 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <Tabs defaultValue={TABS_LIST.Books} className="w-full">
                    <TabsList className="w-full sm:w-auto flex flex-wrap h-auto gap-1 p-1">
                        <TabsTrigger value={TABS_LIST.Books} className="flex-1 sm:flex-none text-xs sm:text-sm">
                            {TABS_LIST.Books}
                        </TabsTrigger>
                        <TabsTrigger value={TABS_LIST.Clientes} className="flex-1 sm:flex-none text-xs sm:text-sm">
                            {TABS_LIST.Clientes}
                        </TabsTrigger>
                        <TabsTrigger value={TABS_LIST.Loans} className="flex-1 sm:flex-none text-xs sm:text-sm">
                            {TABS_LIST.Loans}
                        </TabsTrigger>
                        <TabsTrigger value={TABS_LIST.Payments} className="flex-1 sm:flex-none text-xs sm:text-sm">
                            {TABS_LIST.Payments}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value={TABS_LIST.Books} className="mt-4 sm:mt-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row justify-end gap-2 items-stretch sm:items-center">
                                <CreateLoanDialog />
                                <CreateBookDialog />
                            </div>
                            <div className="overflow-x-auto -mx-4 sm:mx-0">
                                <div className="min-w-full px-4 sm:px-0">
                                    <Suspense fallback={<BooksTableSkeleton />}>
                                        <BooksTable />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value={TABS_LIST.Clientes} className="mt-4 sm:mt-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-end">
                                <CreateClientDialog />
                            </div>
                            <div className="overflow-x-auto -mx-4 sm:mx-0">
                                <div className="min-w-full px-4 sm:px-0">
                                    <Suspense fallback={<ClientsTableSkeleton />}>
                                        <ClientsTable />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value={TABS_LIST.Loans} className="mt-4 sm:mt-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-end">
                                <CreateLoanDialog />
                            </div>
                            <div className="overflow-x-auto -mx-4 sm:mx-0">
                                <div className="min-w-full px-4 sm:px-0">
                                    <Suspense fallback={<LoansTableSkeleton />}>
                                        <LoansTable />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value={TABS_LIST.Payments} className="mt-4 sm:mt-6">
                        <div className="flex items-center justify-center py-12 text-muted-foreground">
                            Próximamente...
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}

export default App;
