import { useQuery } from 'react-query';
import useAxios from '../useAxios';

export function useGetSessionById(id: string) {
  const { findSessionById } = useAxios();
  const { data, refetch } = useQuery(
    ['getSessionById', id],
    () => {
      if (typeof id == 'string' && id.includes('-')) {
        const fullId = id;
        id = fullId.split('-')[0];
      }
      return findSessionById(id);
    },
    { enabled: id != null },
  );
  return { data, refetch };
}
