import { useMutation, useQuery } from 'react-query';
import useAxios from '../useAxios';
import { useSetOrganizationManager } from '../../recoil/User/UserStoreHooks';

export function useUpdateOrganizationManager(id: number, managerId: number) {
  const setOrganization = useSetOrganizationManager();
  const { updateOrganization } = useAxios();
  const { mutateAsync } = useMutation(
    ['updateOrganization', managerId, id],
    () => updateOrganization(id, managerId),
    {
      onSuccess: () => {
        setOrganization(id, managerId);
      },
    },
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
