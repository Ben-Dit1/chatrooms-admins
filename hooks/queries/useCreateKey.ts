import { useMutation, useQuery } from 'react-query';
import useAxios from '../useAxios';

export function useCreateKey() {
  const { createKey } = useAxios();
  const { mutateAsync } = useMutation(['createKey'], (sessionId: string) =>
    createKey(sessionId),
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
