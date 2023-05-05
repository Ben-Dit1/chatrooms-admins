import { organizations } from "@/dummy";
import { Fragment } from "react";
import OrganizationItem from "./OrganizationItem";
import CreateOrganizationModal from "./CreateOrganizationModal";
import { useModal } from "@/hooks/useModal";

export function OrganizationTable() {
  const { close, isOpen, open } = useModal();
  return (
    <>
      <ul className="divide-y divide-gray-300 max-w-7xl flex-1 px-10 w-full mx-auto">
        <div className="my-2 flex gap-x-2">
          <input
            type="text"
            className="block w-[200px] px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="search by organization"
          />
          <button
            onClick={open}
            className="bg-orange-600 px-4 text-slate-100 rounded-md hover:bg-orange-500"
          >
            New
          </button>
        </div>
        {organizations.map((organization) => (
          <Fragment key={organization.id}>
            <OrganizationItem organization={organization} />
          </Fragment>
        ))}
      </ul>
      {isOpen && <CreateOrganizationModal closeModal={close} />}
    </>
  );
}
