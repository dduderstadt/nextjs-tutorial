import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from './ui/fonts';
import Image from 'next/image';
// The Image component is an extension of the <img> element that optimizes images for performance and other benefits:
// Preventing layout shift automatically when images are loading
// Resizing images to avoid shipping large images to devices with a smaller viewport
// Lazy loading images by default (images load as they enter the viewport)
// Serving images in modern formats, like WebP and AVIF, when supported by the browser

export default function Page() {
  return (
    // These are Tailwind classes. You can learn more about Tailwind CSS at https://tailwindcss.com/docs
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        <div className={styles.shape} />
          <p className={`${lusitana.className} text-x1 text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          {/* Its a good practice to set the width and the height of your images to avoid layout shift. These should be an aspect ratio identical to the source image. */}
          {/* "hidden" to remove the image from the DOM on mobile screens. "md:block" to show the image on desktop screens */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className={"block md:hidden"}
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
