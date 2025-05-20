import { MailIcon } from 'lucide-react';
import { env } from 'next-runtime-env';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const frontendVersion = env('NEXT_PUBLIC_FRONT_VERSION') ?? 'dev';
  const backendVersion = env('NEXT_PUBLIC_BACK_VERSION') ?? 'dev';

  return (
    <footer className="py-6 px-6 text-center text-gray-500 text-xs md:text-sm flex md:grid md:grid-cols-[1fr_auto_1fr] gap-4 w-full justify-center items-center mt-8">
      <div className="hidden md:block"></div>
      <div className="flex gap-4 justify-center">
        <p className="border-r-2 pr-4">
          © 2025 tcgscanner
          <span className="hidden md:inline">. All rights reserved.</span>
        </p>
        <p className="border-r-2 pr-4 flex items-center">
          <Link
            href="https://github.com/orgs/tcg-optimizer/repositories"
            target="_blank"
            className="cursor-pointer flex items-center"
          >
            <Image
              src="/icons/github-mark.svg"
              alt="github"
              width={14}
              height={14}
              className="inline-block"
            />
            <label className="hidden md:block ml-2 cursor-pointer">
              Page Source
            </label>
          </Link>
        </p>
        <p className="flex items-center">
          <Link
            href="mailto:tcgscanner.site@gmail.com"
            target="_blank"
            className="flex items-center cursor-pointer"
          >
            <MailIcon className="w-4 h-4" />
            <label className="hidden md:block ml-2 cursor-pointer">
              Contact
            </label>
          </Link>
        </p>
      </div>
      <div className="hidden md:block">
        <p className="text-xs ml-auto w-fit text-transparent" aria-hidden>
          {`${frontendVersion}`} / {`${backendVersion}`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
