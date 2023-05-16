import { useMutation, useQuery } from 'react-query';
import useAxios from '../useAxios';

export function useCreateManager() {
  const { createManager } = useAxios();
  const { mutateAsync } = useMutation(
    ['createManager'],
    (params: { address: string; organizationId: number }) =>
      createManager(params.address, params.organizationId),
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
