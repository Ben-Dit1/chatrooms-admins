import { sessions } from "@/dummy";
import { Fragment, useState } from "react";
import SessionItem from "./SessionItem";
import CreateSessionModal from "./CreateSessionModal";
import Dropdown from "../Dropdown/Dropdown";

export function SessionTable() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
              onClick={() => setIsModalOpen(true)}
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
      {isModalOpen && (
        <CreateSessionModal
          closeModal={() => {
            return setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}
