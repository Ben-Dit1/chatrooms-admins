import { useMutation, useQuery } from 'react-query';
import useAxios from '../useAxios';

export function useUpdateOrganizationManager(id: number, managerId: number) {
  const { updateOrganization } = useAxios();
  const { mutateAsync } = useMutation(
    ['updateOrganization', managerId, id],
    () => updateOrganization(id, managerId),
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
