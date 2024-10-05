import Image from 'next/image'; 
import GithubLogo from '../../public/github-dark.svg';
import Link from 'next/link';

export default function FooterComponent() {
  return (
    <footer className="mt-[10rem] p-6 w-full bg-gradient-to-r from-[#1C3676] to-[#3565DC] flex flex-col gap-4 items-center justify-center">
      <Link href="#hero">
      </Link>
      <p className="mt-2 text-white">
      &copy; {new Date().getFullYear()} BuildMyEvent. All rights reserved.
      </p>
      <a href='https://github.com/BuildMyEvent'>
      <Image
        src={GithubLogo}
        alt="GitHub Logo"
        width={40} 
        height={40}
      />
      </a>
    </footer>
  );
}