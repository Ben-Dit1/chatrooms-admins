import { useCallback, useMemo } from "react";
import { SetterOrUpdater, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { UserAtom, UserData } from "./UserStore";

export const useUserData = (): UserData => {
  return useRecoilValue(UserAtom);
};

export const useSetUserData = (): SetterOrUpdater<UserData> => {
  return useSetRecoilState(UserAtom);
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

export const useSetPermission = () => {
  const userSetter = useSetUserData();
  const setPermissionWithArg = useCallback(
    (role: "manager" | "admin") => {
      if (role == "manager") {
        userSetter((prev) => ({ ...prev, isManager: true }));
      }
      if (role == "admin") {
        userSetter((prev) => ({ ...prev, isAdmin: true, isManager: true }));
      }
    },
    [userSetter]
  );
  return setPermissionWithArg;
};

export const useSetSignature = () => {
  const userSetter = useSetUserData();
  const setSignature = useCallback(
    (signature: string) => {
      userSetter((prev) => ({ ...prev, signature }));
    },
    [userSetter]
  );
  return setSignature;
};

export const useSetAddress = () => {
  const userSetter = useSetUserData();
  const setAddress = useCallback(
    (address: string) => {
      userSetter((prev) => ({ ...prev, address }));
    },
    [userSetter]
  );
  return setAddress;
};
