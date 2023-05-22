import { useMutation, useQuery } from 'react-query';
import useAxios from '../useAxios';
import { success } from '../useToastify';

export function useCreateKey() {
  const { createKey } = useAxios();
  const { mutateAsync } = useMutation(
    ['createKey'],
    (sessionId: string) => createKey(sessionId),
    {
      onSuccess: () => success(),
    },
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
