import { useCallback, useMemo } from 'react';
import {
  SetterOrUpdater,
  selector,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {
  SearchAndSelectionAtom,
  SearchData,
  UserAtom,
  UserData,
} from './UserStore';

export const useUserData = (): UserData => {
  return useRecoilValue(UserAtom);
};

export const useSelectionData = (): SearchData => {
  return useRecoilValue(SearchAndSelectionAtom);
};

export const useSetUserData = (): SetterOrUpdater<UserData> => {
  return useSetRecoilState(UserAtom);
};

export const useSetSearchAndSelection = (): SetterOrUpdater<SearchData> => {
  return useSetRecoilState(SearchAndSelectionAtom);
};

export const useUserInfo = () => {
  const userData = useUserData();
  const data = useMemo(() => {
    return {
      address: userData.address,
      isSigned: Boolean(userData.signature),
      organization: userData.organization,
      isManager: userData.isManager,
      isAdmin: userData.isAdmin,
    };
  }, [userData]);
  return data;
};

export const useSelectionInfo = () => {
  const selectionData = useSelectionData();
  const data = useMemo(() => {
    return {
      organization: selectionData.organization,
      session: selectionData.session,
      members: selectionData.member,
    };
  }, [selectionData]);
  return data;
};

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
    (id: number, name: string, manager: number) => {
      selectionSetter((prev) => ({
        ...prev,
        organization: { name, manager_id: manager, id },
      }));
    },
    [selectionSetter],
  );
  return setSelection;
};
