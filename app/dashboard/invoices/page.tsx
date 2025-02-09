// Add imports
import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/invoices/table";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { fetchInvoicesPages } from "@/app/lib/data";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Invoices' // This will go where the %s placeholder is and include | Acme Dashboard
}

// export default function InvoicesPage() {
//     return <p>Invoices Page</p>;
// }

export default async function InvoicesPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>
}) {
    const searchParams = await props.searchParams;
    const query: string = searchParams?.query || '';
    const currentPage: number = Number(searchParams?.page) || 1;
    const totalPages: number = await fetchInvoicesPages(query); // Returns the total number of pages based on the search query

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                {/* Allow users to search for specific invoices */}
                {/* Your search functionality will span the client and the server. When a user searches for an invoice on the client, the URL params will be updated, data will be fetched on the server, and the table will re-render on the server with the new data. */}
                <Search />
                <CreateInvoice />
            </div>
            {/* Display the invoices */}
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                {/* Allow users to navigate between pages of invoices */}
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}