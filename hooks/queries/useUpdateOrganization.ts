import { useMutation, useQuery } from 'react-query';
import useAxios from '../useAxios';
import { AxiosError } from 'axios';
import { success } from '../useToastify';

export function useUpdateOrganizationManager(id: number, managerId: number) {
  const { updateOrganization } = useAxios();
  const { mutateAsync } = useMutation(
    ['updateOrganization', managerId, id],
    () => updateOrganization(id, managerId),
    {
      onSuccess: () => success(),
    },
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
