import { atom } from 'recoil';
import { Organization, Session, Member } from '../../constants/Types';
export type UserData = {
  address: string;
  organization: string;
  isManager: boolean;
  isAdmin: boolean;
};

export const UserAtom = atom<UserData>({
  key: 'User.Atom',
  default: {
    address: '',
    isAdmin: false,
    isManager: false,
    organization: '',
  },
});
