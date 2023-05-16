import { useQuery } from 'react-query';
import useAxios from '../useAxios';

export function useGetOrganizationById(id: string) {
  const { findOrganizationById } = useAxios();
  const { data, refetch } = useQuery(
    ['getOrganizationById', id],
    () => findOrganizationById(id),
    { enabled: id != null },
  );
  return { data, refetch };
}
