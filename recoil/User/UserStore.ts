import { atom } from 'recoil';
import { Organization, Session, Member } from '../../constants/Types';
export type UserData = {
  address: string;
  organization: string;
  isManager: boolean;
  isAdmin: boolean;
  signature: string;
};

export type SearchData = {
  organization: Organization | undefined;
  session: Session | undefined;
  member: Member | undefined;
};

export const UserAtom = atom<UserData>({
  key: 'User.Atom',
  default: {
    address: '',
    isAdmin: false,
    isManager: false,
    organization: '',
    signature: '',
  },
});

export const SearchAndSelectionAtom = atom<SearchData>({
  key: 'Search.Atom',
  default: {
    organization: undefined,
    member: undefined,
    session: undefined,
  },
});
