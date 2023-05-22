import { useMutation } from 'react-query';
import useAxios from '../useAxios';
import { AxiosError } from 'axios';
import { success } from '../useToastify';

export function useCreateSession() {
  const { createSession } = useAxios();

  const { mutateAsync } = useMutation(
    ['createManager'],
    (params: { name: string; organizationId: number }) =>
      createSession(params.name, params.organizationId),
    {
      onSuccess: () => success(),
    },
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
