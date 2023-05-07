import { Member } from '@/constants/Types';
import { useSelectionData } from '@/recoil/User/UserStoreHooks';
import React from 'react';

const MemberItem = ({ member }: { member: Member }) => {
  const { organization } = useSelectionData();

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
            <button className="py-2 bg-orange-600 px-4 text-slate-100 rounded-md hover:bg-orange-500 min-w-[150px]">
              Set new manager
            </button>
          )}

          <button className="py-2 bg-orange-600 px-4 text-slate-100 rounded-md hover:bg-orange-500">
            Delete
          </button>
          {/* fix above line to correspond organization.managerId */}
        </div>
      </div>
    </li>
  );
};

export default MemberItem;
