import { useQuery } from 'react-query';
import useAxios from '../useAxios';

export function useGetManagerById(id?: number) {
  const { findManagerById } = useAxios();
  const { data } = useQuery(['getManagerById', id], () => findManagerById(id), {
    enabled: id != null,
  });
  return { data };
}
