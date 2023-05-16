import { useMutation } from 'react-query';
import useAxios from '../useAxios';

export function useCreateSession() {
  const { createSession } = useAxios();
  const { mutateAsync } = useMutation(
    ['createManager'],
    (params: { name: string; organizationId: number }) =>
      createSession(params.name, params.organizationId),
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
