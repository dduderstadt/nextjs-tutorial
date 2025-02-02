'use client'; // React directive
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link'; // Add this line to use the Link component from Next.js
import { usePathname } from 'next/navigation'; // React hook provided by next/navigation to get the page the user is currently on.
import clsx from 'clsx'; // Bring in clsx to conditionally apply classes to elements (e.g. active navigation).

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon }, // Single link
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon, },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname: string = usePathname(); // Get the current page
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          // <a
          <Link // Replace the <a> tag with the Link component to not reload the page when navigating to a different page.
            key={link.name}
            href={link.href}
            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-blue-600' : pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
          // />
        );
      })}
    </>
  );
}
