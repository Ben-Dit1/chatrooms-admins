import { atom } from "recoil";

export type UserData = {
  address: string;
  organization: string;
  isManager: boolean;
  isAdmin: boolean;
  signature: string;
};

export type SearchData = {
  organization: string;
  session: string;
  member: string;
};

export const UserAtom = atom<UserData>({
  key: "User.Atom",
  default: {
    address: "",
    isAdmin: false,
    isManager: false,
    organization: "",
    signature: "",
  },
});

export const SearchAndSelectionAtom = atom<SearchData>({
  key: "Search.Atom",
  default: {
    organization: "",
    member: "",
    session: "",
  },
});
