import { Member } from '@/constants/Types';
import { useDeleteManager } from '@/hooks/queries/useDeleteManager';
import { useUpdateOrganizationManager } from '@/hooks/queries/useUpdateOrganization';
import { useSelectionData } from '@/recoil/User/UserStoreHooks';
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
  const { organization } = useSelectionData();
  const { mutateAsync: setNewManager } = useUpdateOrganizationManager(
    organization?.id || 0,
    member.id,
  );
  const { mutateAsync: deleteManager } = useDeleteManager();
  async function handleDelete() {
    await deleteManager(member.id);
    await refetch();
  }

  return (
    <li
      key={member.id}
      className="flex flex-wrap flex-1 flex-col md:flex-row items-center justify-between gap-x-6 gap-y-4 px-2 py-5 sm:flex-nowrap"
    >
      <div className="md:flex md:items-center md:gap-x-4">
        <p className="font-semibold leading-6 text-gray-900 min-w-[120px]">
          {member.address}
        </p>
        <div className="mt-1 md:mt-0 flex items-center gap-x-2 text-sm leading-5 text-gray-500 md:border-l-2 md:pl-4">
          {organization?.manager_id && member.id == organization?.manager_id ? (
            <p className="py-2 bg-green-600 px-4 text-slate-100 rounded-md min-w-[150px] text-center">
              Manager
            </p>
          ) : (
            <button
              onClick={() => {
                if (organization?.id) {
                  setNewManager();
                }
              }}
              className="py-2 bg-orange-600 px-4 text-slate-100 rounded-md hover:bg-orange-500 min-w-[150px]"
            >
              Set new manager
            </button>
          )}

          <button
            onClick={handleDelete}
            className="py-2 bg-orange-600 px-4 text-slate-100 rounded-md hover:bg-orange-500"
          >
            Delete
          </button>
          {/* fix above line to correspond organization.managerId */}
        </div>
      </div>
    </li>
  );
};

export default MemberItem;
