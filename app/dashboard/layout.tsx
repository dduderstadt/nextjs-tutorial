import SideNav from '@/app/ui/dashboard/sidenav'; // Import the SideNav component

// One benefit of using layouts in Next.js is that on navigation, only the page components update while the layout won't re-render.
// This is called partial rendering which preserves client-side React state in the layout when transitioning between pages.
export default function Layout({ children}: { children: React.ReactNode }) {
    // The Layout receives a children prop (page or layout) and renders the SideNav component and the children prop.
    // All pages inside of /dashboard will automatically be nested inside the Layout component.
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    )
}