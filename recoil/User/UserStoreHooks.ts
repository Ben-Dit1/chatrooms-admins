import { useCallback, useMemo } from 'react';
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';
import { UserAtom, UserData } from './UserStore';

//getters
export const useUserData = (): UserData => {
  return useRecoilValue(UserAtom);
};

//setters
export const useSetUserData = (): SetterOrUpdater<UserData> => {
  return useSetRecoilState(UserAtom);
};

//custom hooks

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
