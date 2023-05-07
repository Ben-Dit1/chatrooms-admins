import { sessions } from '@/dummy';
import { Fragment } from 'react';
import SessionItem from './SessionItem';
import { useModal } from '@/hooks/useModal';
import Modal from '../Modal/Modal';
import { useGetOrganizations } from '@/hooks/queries/useGetOrganizations';

export function SessionTable() {
  const { close, isOpen, open } = useModal();
  const { data: organizations } = useGetOrganizations('');
  return (
    <>
      <ul className="divide-y divide-gray-300 max-w-7xl flex-1 px-10 mx-auto">
        <div className="flex gap-x-2">
          <div className="my-2">
            <input
              type="text"
              className="block px-4 w-[200px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="search by session"
            />
          </div>
          <div className="my-2 flex gap-x-2">
            <input
              type="text"
              className="block px-4 w-[200px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="search by organization"
            />
            <button
              onClick={open}
              className="bg-orange-600 px-4 text-slate-100 rounded-md hover:bg-orange-500"
            >
              New
            </button>
          </div>
        </div>

        {sessions.map((session) => (
          <Fragment key={session.id}>
            <SessionItem session={session} />
          </Fragment>
        ))}
      </ul>
      {isOpen && (
        <Modal
          buttonText="Create"
          title="New Session"
          dropdownItems={organizations?.data}
          closeModal={close}
        />
      )}
    </>
  );
}
