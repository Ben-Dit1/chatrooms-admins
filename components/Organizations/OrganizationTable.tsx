import { Fragment, useState } from 'react';
import OrganizationItem from './OrganizationItem';
import { useModal } from '@/hooks/useModal';
import Modal from '../Modal/Modal';
import { Organization } from '@/constants/Types';
import { useCreateOrganization } from '@/hooks/queries/useCreateOrganization';
import { useGetOrganizationsBySignature } from '@/hooks/queries/useGetOrganizationsBySignature';

export function OrganizationTable() {
  const [searchParam, setSearchParam] = useState<string>('');
  const [page, setPage] = useState(0);
  const { data: organizations, refetch } = useGetOrganizationsBySignature(
    searchParam,
    page,
  );
  const { close, isOpen, open } = useModal();
  const { mutateAsync: createOrganization } = useCreateOrganization();

  async function createNewOrganization(name: string) {
    if (name) {
      await createOrganization(name);
      close();
      await refetch();
    }
  }
  return (
    <>
      <ul className="divide-y divide-gray-300 max-w-7xl flex-1 px-10 w-full mx-auto">
        <div className="my-2 flex gap-x-2">
          <input
            type="text"
            className="block w-[200px] px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="search by organization"
            value={searchParam}
            onChange={(e) => setSearchParam((prev) => e.target.value)}
          />
          <button
            onClick={open}
            className="bg-orange-600 px-4 text-slate-100 rounded-md hover:bg-orange-500"
          >
            New
          </button>
        </div>
        {organizations?.data.map((organization: Organization) => (
          <Fragment key={organization.id}>
            <OrganizationItem organization={organization} />
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
          if (organizations != null && organizations.data.length >= 7) {
            setPage((prev) => prev + 1);
          }
        }}
        className={`${
          organizations != null && organizations.data.length >= 7
            ? 'text-slate-900 cursor-pointer'
            : 'text-gray-400'
        } rounded-full px-2 text-center fixed bottom-5 left-16`}
      >
        {'>'}
      </p>
      {isOpen && (
        <Modal
          buttonText="Create"
          title="Organization"
          onSubmit={createNewOrganization}
          closeModal={close}
        />
      )}
    </>
  );
}
