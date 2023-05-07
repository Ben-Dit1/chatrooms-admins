import { PATHNAME } from '@/constants/Pathnames';
import { Organization } from '@/constants/Types';
import { useGetManagerById } from '@/hooks/queries/useGetManagerById';
import {
  useSetOrganization,
  useSetSearchAndSelection,
} from '@/recoil/User/UserStoreHooks';
import { useRouter } from 'next/navigation';
import React from 'react';

const OrganizationItem = ({ organization }: { organization: Organization }) => {
  const route = useRouter();
  const setOrganization = useSetOrganization();
  const { data: manager } = useGetManagerById(organization.manager_id);
  return (
    <li
      key={organization.id}
      className="flex flex-wrap flex-1 flex-col md:flex-row items-center justify-between gap-x-6 gap-y-4 px-2 py-5 sm:flex-nowrap"
    >
      <div className="md:flex md:items-center md:gap-x-4">
        <p className="font-semibold leading-6 text-gray-900 min-w-[120px]">
          {organization.name}
        </p>
        <div className="mt-1 md:mt-0 flex items-center gap-x-2 text-sm leading-5 text-gray-500 md:border-l-2 md:pl-4">
          <p>{manager != null ? manager.data.address : 'no manager'}</p>
        </div>
      </div>
      <div className="flex w-full flex-none justify-center gap-x-1 sm:w-auto">
        <button
          onClick={() => {
            setOrganization(
              organization.id,
              organization.name,
              organization.manager_id || 0,
            );
            route.push(PATHNAME.manage(String(organization.id)));
          }}
          className="px-3 py-2 bg-slate-900 text-slate-200 rounded-md hover:scale-[1.02] transition-all min-w-[75px]"
        >
          Manage
        </button>
      </div>
    </li>
  );
};

export default OrganizationItem;
