import { useMutation, useQuery } from 'react-query';
import useAxios from '../useAxios';
import {
  useSetOrganizationManager,
  useUserData,
} from '../../recoil/User/UserStoreHooks';

export function useCreateOrganization() {
  const { isAdmin, signature } = useUserData();
  const { createOrganization } = useAxios();
  const { mutateAsync } = useMutation(['createOrganization'], (name: string) =>
    createOrganization(name),
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
