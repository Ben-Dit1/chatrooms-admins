import { PATHNAME } from '@/constants/Pathnames';
import { useRouter, usePathname } from 'next/navigation';

export function Navbar() {
  const route = useRouter();
  const pathname = usePathname();

  if (pathname) {
    if (pathname == PATHNAME.login || pathname.startsWith(PATHNAME.qr)) {
      return null;
    }
  }

  return (
    <div className="bg-slate-900 h-[80px] flex justify-start items-center text-slate-200 gap-x-2 sm:gap-x-8 px-2 md:px-8">
      <h1 className="text-lg md:text-2xl mr-2 sm:mr-8 hover:cursor-pointer tracking-wider">
        chatrooms.
      </h1>
      <p
        onClick={() => route.push(PATHNAME.organizations)}
        className={`hover:cursor-pointer ${
          pathname == PATHNAME.organizations && 'bg-slate-600'
        } px-2 py-1 rounded-md`}
      >
        Organizations
      </p>
      <p
        onClick={() => route.push(PATHNAME.sessions)}
        className={`hover:cursor-pointer px-2 py-1 rounded-md ${
          pathname == PATHNAME.sessions && 'bg-slate-600'
        }`}
      >
        Sessions
      </p>
    </div>
  );
}
