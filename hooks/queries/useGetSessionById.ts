import { useQuery } from 'react-query';
import useAxios from '../useAxios';

export function useGetSessionById(id: string) {
  const { findSessionById } = useAxios();
  const { data, refetch } = useQuery(
    ['getSessionById', id],
    () => findSessionById(id),
    { enabled: id != null },
  );
  return { data, refetch };
}
