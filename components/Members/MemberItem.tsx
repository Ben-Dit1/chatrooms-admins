import { Member } from '@/constants/Types';
import { useDeleteManager } from '@/hooks/queries/useDeleteManager';
import { useAdminOrManager } from '@/hooks/queries/useGetAdminOrManager';
import { useUpdateOrganizationManager } from '@/hooks/queries/useUpdateOrganization';
import { AxiosResponse } from 'axios';
import React from 'react';
import { QueryObserverResult } from 'react-query';

const MemberItem = ({
  member,
  refetch,
}: {
  member: Member;
  refetch: () => Promise<
    QueryObserverResult<AxiosResponse<Member[], any>, unknown>
  >;
}) => {
  const { mutateAsync: deleteManager } = useDeleteManager();

  const { mutateAsync: setNewManager } = useUpdateOrganizationManager(
    member.organization_id,
    member.id,
  );
  async function handleDelete() {
    await deleteManager(member.id);
    await refetch();
  }
  const { data: isAdminOrManager } = useAdminOrManager();
  return (
    <li
      key={member.id}
      className="flex flex-wrap flex-1 flex-col md:flex-row items-center justify-between gap-x-6 gap-y-4 px-2 py-5 sm:flex-nowrap"
    >
      <div className="md:flex md:items-center md:gap-x-4">
        <p className="font-semibold leading-6 text-gray-900 min-w-[410px]">
          {member.address}
        </p>
        <div className="mt-1 md:mt-0 flex items-center gap-x-2 text-sm leading-5 text-gray-500 md:border-l-2 md:pl-4">
          {member.manages ? (
            <p className="py-2 bg-green-600 px-4 text-slate-100 rounded-md min-w-[150px] text-center">
              Manager
            </p>
          ) : null}
          {isAdminOrManager?.data.admin && !member.manages ? (
            <button
              onClick={async () => {
                await setNewManager();
                await refetch();
              }}
              className="py-2 bg-green-600 px-4 text-slate-100 rounded-md hover:bg-green-500"
            >
              Set New Manager
            </button>
          ) : null}
          {!member.manages &&
          (isAdminOrManager?.data.manager || isAdminOrManager?.data.admin) ? (
            <button
              onClick={handleDelete}
              className="py-2 bg-orange-600 px-4 text-slate-100 rounded-md hover:bg-orange-500"
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default MemberItem;
