import { useMutation } from 'react-query';
import useAxios from '../useAxios';
import { useUserData } from '../../recoil/User/UserStoreHooks';

export function useCreateSession() {
  const { isAdmin, signature } = useUserData();
  const { createSession } = useAxios();
  const { mutateAsync } = useMutation(
    ['createManager', signature],
    (params: { name: string; organizationId: number }) =>
      createSession(params.name, params.organizationId),
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
