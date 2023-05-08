import { useMutation, useQuery } from 'react-query';
import useAxios from '../useAxios';
import {
  useSetOrganizationManager,
  useUserData,
} from '../../recoil/User/UserStoreHooks';

export function useUpdateOrganizationManager(id: number, managerId: number) {
  const setOrganization = useSetOrganizationManager();
  const { isAdmin, signature } = useUserData();
  const { updateOrganization } = useAxios();
  const { mutateAsync } = useMutation(
    ['updateOrganization', managerId, id],
    () => updateOrganization(id, signature, managerId),
    {
      onSuccess: () => {
        setOrganization(id, managerId);
      },
    },
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
