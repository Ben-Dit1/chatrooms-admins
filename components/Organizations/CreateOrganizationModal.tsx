import React, { SetStateAction } from "react";

type CreateOrganizationModalProps = {
  closeModal: () => void;
};

const CreateOrganizationModal = ({ closeModal }: CreateOrganizationModalProps) => {
  return (
    <div
      onClick={() => {
        closeModal();
      }}
      className="h-screen w-screen absolute top-0 left-0 flex  backdrop-blur-sm"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-1/2 h-1/3 bg-slate-900 mx-auto translate-y-1/2 rounded-xl flex justify-center items-center flex-col gap-y-4"
      >
        <p className="text-2xl text-slate-100">Enter New Organization</p>
        <input
          type="text"
          className="block w-1/2 px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Organization Name"
        />
        <button className="bg-orange-600 text-slate-100 px-4 py-2 rounded-md hover:bg-orange-500">
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateOrganizationModal;
