import { useMutation, useQuery } from 'react-query';
import useAxios from '../useAxios';
import {
  useSetOrganizationManager,
  useUserData,
} from '../../recoil/User/UserStoreHooks';

export function useDeleteManager() {
  const { isAdmin, signature } = useUserData();
  const { deleteManager } = useAxios();
  const { mutateAsync } = useMutation(
    ['deleteManager', signature],
    (id: number) => deleteManager(id),
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
