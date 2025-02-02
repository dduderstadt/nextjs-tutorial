import DashboardSkeleton from "@/app/ui/skeletons";
// 1. loading.tsx is a special Next.js file built on top of React Suspense. It allows you to create fallback UI to show as a replacement while page content loads
// 2. Since <SideNav> is static, it's shown immediately. The user can interact with <SideNav> while the dynamic content is loading.
// 3. The user doesn't have to wait for the page to finish loading before navigating away (this is called interruptable navigation).
export default function Loading() {
    // return <div>Loading...</div>
    return <DashboardSkeleton />;
}

// Right now, the loading skeleton will apply to the invoices.
// Since loading.tsx is a level higher than /invoices/page.tsx and /customers/page.tsx in the file system, its also applied to those pages.
// By adding a new folder called /(overview) inside the dashboard folder and moving loading.tsx, page.tsx into it, we can create a route group.
// Now, the loading.tsx file will only apply to your dashboard overview page.

// Route Groups
// Allow you to organize files into logical groups without affecting the URL path structure.
// When you create a new folder using parenthesis (), the name won't be included in the URL path. So /dashboard/(overview)/page.tsx becomes /dashboard

// Route Groups (TECHNICAL)
// In the app directory, nested folders are normally mapped to URL paths. However, you can make a folder as a Route Group to prevent the
// folder from being included in the route's URL path.
// This allows you to organize your route segments and project files into logical groups without affecting the URL path structure.
// Route Groups are useful for:
// - Organizing routes into groups (e.g. by site section, intent, or team)
// - Enabling nested layouts in the same route segment level:
//   - Creating multiple nested layouts in the same segment, including multiple root layers
//   - Adding a layout to a subset of routes in a common segment
// - Adding a loading skeleton to specific route in a common segment

// Convention
// A route group can be created by wrapping a folder's name in parenthesis: (folderName)