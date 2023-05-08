import { useQuery } from 'react-query';
import useAxios from '../useAxios';

export function useGetManagersByOrganizationId(
  id: number,
  search: string,
  page?: number,
) {
  const { findManagersByOrganization } = useAxios();
  const { data, refetch } = useQuery(
    ['getManagerById', id, search, page],
    () => findManagersByOrganization(id, search, page),
    { enabled: id != null },
  );
  return { data, refetch };
}
