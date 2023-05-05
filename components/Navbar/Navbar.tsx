import { PATHNAME } from "@/constants/Pathnames";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const route = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-slate-900 h-[80px] flex justify-start items-center text-slate-200 gap-x-8 px-8">
      <h1 className="text-2xl mr-8 hover:cursor-pointer ">chatrooms.</h1>
      <p
        onClick={() => route.push("/organizations")}
        className={`hover:cursor-pointer ${
          pathname == PATHNAME.organizations && "bg-slate-600"
        } px-2 py-1 rounded-md`}
      >
        Organizations
      </p>
      <p
        onClick={() => route.push("/sessions")}
        className={`hover:cursor-pointer px-2 py-1 rounded-md ${
          pathname == PATHNAME.sessions && "bg-slate-600"
        }`}
      >
        Sessions
      </p>
    </div>
  );
}
