import { Fragment, useState } from 'react';
import MemberItem from './MemberItem';
import { useModal } from '@/hooks/useModal';
import Modal from '../Modal/Modal';
import { useGetManagersByOrganizationId } from '@/hooks/queries/useGetManagersByOrganizationId';

export function MemberTable({ id }: { id: string | string[] | undefined }) {
  const [searchParam, setSearchParam] = useState<string>('');
  const { data: members } = useGetManagersByOrganizationId(
    Number(id),
    searchParam,
  );

  const { close, isOpen, open } = useModal();
  return (
    <>
      <ul className="divide-y divide-gray-300 max-w-7xl flex-1 px-10 w-full mx-auto">
        <div className="my-2 flex gap-x-2">
          <input
            type="text"
            className="block w-[200px] px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search by member"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <button
            onClick={open}
            className="bg-orange-600 px-4 text-slate-100 rounded-md hover:bg-orange-500"
          >
            New
          </button>
          <p className="self-center ml-auto mr-0 bg-slate-900 text-slate-100 px-4 py-2 rounded-md">
            Members
          </p>
        </div>
        {members?.data.map((member) => (
          <Fragment key={member.id}>
            <MemberItem member={member} />
          </Fragment>
        ))}
      </ul>
      {isOpen && (
        <Modal
          buttonText="Create"
          title="New Member address or ens"
          closeModal={close}
        />
      )}
    </>
  );
}
