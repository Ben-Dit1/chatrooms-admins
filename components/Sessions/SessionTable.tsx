import { Fragment, useState } from 'react';
import SessionItem from './SessionItem';
import { useModal } from '@/hooks/useModal';
import Modal from '../Modal/Modal';
import { useCreateSession } from '@/hooks/queries/useCreateSession';
import { useGetSessionsBySignature } from '@/hooks/queries/useGetSessionsBySignature';
import { useGetOrganizationsBySignature } from '@/hooks/queries/useGetOrganizationsBySignature';
import { error } from '@/hooks/useToastify';

export function SessionTable() {
  const { close, isOpen, open } = useModal();
  const { data: organizations } = useGetOrganizationsBySignature('', 0, 'true');
  const [searchParam, setSearchParam] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const { data: sessions, refetch } = useGetSessionsBySignature(
    searchParam,
    page,
  );
  const { mutateAsync: createSession } = useCreateSession();
  async function onSubmit(name: string, organizationId: number) {
    try {
      if (name) {
        await createSession({ name, organizationId });
      }
      close();
      await refetch();
    } catch (err: any) {
      error(err.response.data.message);
    }
  }
  return (
    <>
      <ul className="divide-y divide-gray-300 max-w-7xl flex-1 px-10 mx-auto">
        <div className="flex gap-x-2">
          <div className="my-2">
            <input
              type="text"
              className="block px-4 w-[200px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="search by session"
              value={searchParam}
              onChange={(e) => setSearchParam((prev) => e.target.value)}
            />
          </div>
          <div className="my-2 flex gap-x-2">
            <button
              onClick={open}
              className="bg-orange-600 px-4 text-slate-100 rounded-md hover:bg-orange-500"
            >
              New
            </button>
          </div>
        </div>

        {sessions?.data.map((session) => (
          <Fragment key={session.id}>
            <SessionItem session={session} />
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
          if (sessions != null && sessions.data.length >= 7) {
            setPage((prev) => prev + 1);
          }
        }}
        className={`${
          sessions != null && sessions.data.length >= 7
            ? 'text-slate-900 cursor-pointer'
            : 'text-gray-400'
        } rounded-full px-2 text-center fixed bottom-5 left-16`}
      >
        {'>'}
      </p>
      {isOpen && (
        <Modal
          buttonText="Create"
          title="New Session"
          dropdownItems={organizations?.data}
          closeModal={close}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}
