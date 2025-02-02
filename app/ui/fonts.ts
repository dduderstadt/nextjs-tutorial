// Adding a custom Google font to the application
import { Inter } from 'next/font/google';
// Practice: add a secondary font called "Lusitana" and pass it to the <p> element in /app/page.tsx
import { Lusitana } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({ weight: ['400', '700'], subsets: ['latin'] });