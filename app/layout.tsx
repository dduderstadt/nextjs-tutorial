import '@/app/ui/global.css';
// You can import global.css in any component in your application, but it's usually a good practice to add it to your top-level component. In Next.js, this is the RootLayout component.
import { inter } from '@/app/ui/fonts';
// You can import the inter font from the fonts module and use it in your components.

// The RootLayout is required in every Next.js application. Any UI you add to the root layout will be shared across all pages in your application.
// You can use the root layout to add global styles, fonts, or components that should be shared across all pages, modify your <html> and <body> tags and add metadata.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
      {/* By adding Inter to the <body> element, the font will be applied throughout the entire application.
      We also added the "antialiased" Tailwind class which smooths out the font. It's not necessary, but adds a nice touch. */}
    </html>
  );
}
