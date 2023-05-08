import { Fragment, useState } from 'react';
import MemberItem from './MemberItem';
import { useModal } from '@/hooks/useModal';
import Modal from '../Modal/Modal';
import { useGetManagersByOrganizationId } from '@/hooks/queries/useGetManagersByOrganizationId';
import { useCreateManager } from '@/hooks/queries/useCreateManager';

export function MemberTable({ id }: { id: string | string[] | undefined }) {
  const [searchParam, setSearchParam] = useState<string>('');
  const [page, setPage] = useState<number>(0);

  const { data: members, refetch } = useGetManagersByOrganizationId(
    Number(id),
    searchParam,
    page,
  );
  const { mutateAsync: createManager } = useCreateManager();
  const { close, isOpen, open } = useModal();

  async function onSubmit(address: string) {
    await createManager({ address, organizationId: Number(id) });
    close();
    await refetch();
  }
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
            <MemberItem refetch={refetch} member={member} />
          </Fragment>
        ))}
      </ul>
      <p
        onClick={() => {
          if (page != 0) {
            setPage((prev) => prev - 1);
          }
        }}
        className={`rounded-full px-2 text-center ${
          page == 0 ? 'text-gray-400' : 'text-slate-900 cursor-pointer'
        } bottom-5 left-10 fixed`}
      >
        {'<'}
      </p>
      <p
        onClick={() => {
          if (members != null && members.data.length >= 7) {
            setPage((prev) => prev + 1);
          }
        }}
        className={`${
          members != null && members.data.length >= 7
            ? 'text-slate-900 cursor-pointer'
            : 'text-gray-400'
        } rounded-full px-2 text-center fixed bottom-5 left-16`}
      >
        {'>'}
      </p>
      {isOpen && (
        <Modal
          buttonText="Create"
          title="New Member address or ens"
          closeModal={close}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}
