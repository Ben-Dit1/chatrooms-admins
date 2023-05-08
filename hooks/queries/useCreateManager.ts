import { useMutation, useQuery } from 'react-query';
import useAxios from '../useAxios';
import {
  useSetOrganizationManager,
  useUserData,
} from '../../recoil/User/UserStoreHooks';

export function useCreateManager() {
  const { isAdmin, signature } = useUserData();
  const { createManager } = useAxios();
  const { mutateAsync } = useMutation(
    ['createManager', signature],
    (params: { address: string; organizationId: number }) =>
      createManager(params.address, params.organizationId, signature),
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
