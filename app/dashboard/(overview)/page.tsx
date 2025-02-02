// export default function DashboardPage() {
//     return <p>Dashboard Page</p>;
// }

// Add new import statements
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
// import { // fetchLatestInvoices,
//     fetchCardData } from '@/app/lib/data';
// Streaming a component, import Suspense from React
import { Suspense } from 'react';
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import { CardSkeleton } from '@/app/ui/skeletons';

// The DashboardPage component is an async server component. This allows us to use await to fetch data.
export default async function DashboardPage() {
    // Fetch data from the database

    // const latestInvoices = await fetchLatestInvoices(); // Moved to LastInvoices component
    // const {
    //     numberOfInvoices,
    //     numberOfCustomers,
    //     totalPaidInvoices,
    //     totalPendingInvoices
    // } = await fetchCardData();

    // The data requests are unintentionally blocking each other, creating a request waterfall.
    // By default, Next.js prerenders routes to improve performance - this is called Static Rendering. So if your data changes, it won't be reflected in your Dashboard.

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2x1`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
                <Card title="Pending" value={totalPendingInvoices} type="pending" />
                <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
                <Card
                        title="Total Customers"
                        value={numberOfCustomers}
                        type="customers"
                    /> */}
                <Suspense fallback={<CardSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div>
        </main>
    )
}