import { useQuery } from 'react-query';
import useAxios from '../useAxios';

export function useGetSessionsBySignature(search: string, page: number = 0) {
  const { findSessionsBySignature } = useAxios();
  const { data, refetch } = useQuery(
    ['getSessionsBySignature', search, page],
    () => findSessionsBySignature(search, page),
  );
  return { data, refetch };
}
