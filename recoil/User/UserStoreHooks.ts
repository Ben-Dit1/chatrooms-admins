import { useCallback, useMemo } from 'react';
import {
  SetterOrUpdater,
  selector,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { SelectionAtom, SelectionData, UserAtom, UserData } from './UserStore';

//getters
export const useUserData = (): UserData => {
  return useRecoilValue(UserAtom);
};

export const useSelectionData = (): SelectionData => {
  return useRecoilValue(SelectionAtom);
};
//setters
export const useSetUserData = (): SetterOrUpdater<UserData> => {
  return useSetRecoilState(UserAtom);
};

export const useSetSearchAndSelection = (): SetterOrUpdater<SelectionData> => {
  return useSetRecoilState(SelectionAtom);
};

//custom hooks

export const useSetPermission = () => {
  const userSetter = useSetUserData();
  const setPermissionWithArg = useCallback(
    (role: 'manager' | 'admin') => {
      if (role == 'manager') {
        userSetter((prev) => ({ ...prev, isManager: true }));
      }
      if (role == 'admin') {
        userSetter((prev) => ({ ...prev, isAdmin: true, isManager: true }));
      }
    },
    [userSetter],
  );
  return setPermissionWithArg;
};

export const useSetSignature = () => {
  const userSetter = useSetUserData();
  const setSignature = useCallback(
    (signature: string) => {
      userSetter((prev) => ({ ...prev, signature }));
    },
    [userSetter],
  );
  return setSignature;
};

export const useSetAddress = () => {
  const userSetter = useSetUserData();
  const setAddress = useCallback(
    (address: string) => {
      userSetter((prev) => ({ ...prev, address }));
    },
    [userSetter],
  );
  return setAddress;
};

export const useSetOrganization = () => {
  const selectionSetter = useSetSearchAndSelection();
  const setSelection = useCallback(
    (id: number, name: string, manager?: number) => {
      selectionSetter((prev) => ({
        ...prev,
        organization: { name, manager_id: manager, id },
      }));
    },
    [selectionSetter],
  );
  return setSelection;
};

export const useSetOrganizationManager = () => {
  const selectionSetter = useSetSearchAndSelection();
  const setSelection = useCallback(
    (id: number, manager: number) => {
      selectionSetter((prev) => ({
        ...prev,
        organization: {
          name: prev.organization?.name || '',
          manager_id: manager,
          id,
        },
      }));
    },
    [selectionSetter],
  );
  return setSelection;
};
