import React, { SetStateAction, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { Organization } from '@/constants/Types';

type ModalProps = {
  closeModal: () => void;
  title: string;
  buttonText: string;
  dropdownItems?: Organization[];
  onSubmit: (name: string, organizationId: number) => Promise<void>;
};

const Modal = ({
  closeModal,
  title,
  buttonText,
  dropdownItems,
  onSubmit,
}: ModalProps) => {
  const [input, setInput] = useState<string>('');
  const [organizationId, setOrganizationId] = useState<number>(0);
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
        className={`w-[40%] ${
          dropdownItems ? 'h-1/3' : 'h-1/4'
        } bg-slate-900 mx-auto translate-y-1/2 rounded-xl flex justify-center items-center flex-col gap-y-4`}
      >
        <p className="text-2xl mb-4 text-slate-100">{title}</p>
        <input
          type="text"
          className="block w-1/2 px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={title + ' Name'}
          value={input}
          onChange={(e) => {
            setInput((prev) => e.target.value);
          }}
        />
        {dropdownItems && <Dropdown organizations={dropdownItems} />}
        <button
          onClick={async () => await onSubmit(input, organizationId)}
          className="bg-orange-600 text-slate-100 px-4 py-2 rounded-md hover:bg-orange-500"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
