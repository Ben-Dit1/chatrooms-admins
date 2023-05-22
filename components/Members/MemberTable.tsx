import { Fragment } from 'react';
import MemberItem from './MemberItem';
import { useModal } from '@/hooks/useModal';
import Modal from '../Modal/Modal';
import { useCreateManager } from '@/hooks/queries/useCreateManager';
import { useGetManagersBySignature } from '@/hooks/queries/useGetManagersBySignature';
import { error } from '@/hooks/useToastify';

export function MemberTable({ organizationId }: { organizationId: string }) {
  const { mutateAsync: createManager } = useCreateManager();
  const { close, isOpen, open } = useModal();
  const { data: members, refetch } = useGetManagersBySignature(organizationId);

  async function onSubmit(address: string) {
    try {
      await createManager({
        address,
        organizationId: Number(organizationId),
      });
      close();
      await refetch();
    } catch (err: any) {
      error(err.response.data.message);
    }
  }

  return (
    <>
      <ul className="divide-y divide-gray-300 max-w-7xl flex-1 px-10 w-full mx-auto">
        <div className="my-2 flex gap-x-2">
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
