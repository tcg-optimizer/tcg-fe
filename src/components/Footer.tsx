import { MailIcon } from 'lucide-react';
import { env } from 'next-runtime-env';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const frontendVersion = env('NEXT_PUBLIC_FRONT_VERSION') ?? 'dev';
  const backendVersion = env('NEXT_PUBLIC_BACK_VERSION') ?? 'dev';

  return (
    <footer className="py-6 px-6 text-center text-gray-500 text-sm grid grid-cols-[1fr_auto_1fr] gap-4 w-full justify-center items-center mt-8">
      <div></div>
      <div className="flex gap-4 justify-center">
        <p className="border-r-2 pr-4">
          © 2025 tcgscanner. All rights reserved.
        </p>
        <p className="border-r-2 pr-4">
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
            <label className="ml-2 cursor-pointer">Page Source</label>
          </Link>
        </p>
        <p>
          <Link
            href="mailto:tcgscanner.site@gmail.com"
            target="_blank"
            className="flex items-center cursor-pointer"
          >
            <MailIcon className="w-4 h-4" />
            <label className="ml-2 cursor-pointer">Contact</label>
          </Link>
        </p>
      </div>
      <div>
        <p className="text-xs ml-auto w-fit text-transparent" aria-hidden>
          {`${frontendVersion}`} / {`${backendVersion}`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
