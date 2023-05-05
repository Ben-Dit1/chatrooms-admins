import { useRouter } from "next/navigation";
import React from "react";

type Organization = {
  id: number;
  name: string;
  managerId?: number;
};

const OrganizationItem = ({ organization }: { organization: Organization }) => {
  const route = useRouter();
  return (
    <li
      key={organization.id}
      className="flex flex-wrap flex-1 flex-col md:flex-row items-center justify-between gap-x-6 gap-y-4 px-2 py-5 sm:flex-nowrap"
    >
      <div className="md:flex md:items-center md:gap-x-4">
        <p className="font-semibold leading-6 text-gray-900 min-w-[120px]">{organization.name}</p>
        <div className="mt-1 md:mt-0 flex items-center gap-x-2 text-sm leading-5 text-gray-500 md:border-l-2 md:pl-4">
          <p>{organization.managerId ? organization.managerId : "No manager!"}</p>
        </div>
      </div>
      <div className="flex w-full flex-none justify-center gap-x-1 sm:w-auto">
        <button
          onClick={() => route.push("organizations/manage/" + organization.id)}
          className="px-3 py-2 bg-slate-900 text-slate-200 rounded-md hover:scale-[1.02] transition-all min-w-[75px]"
        >
          Manage
        </button>
      </div>
    </li>
  );
};

export default OrganizationItem;
