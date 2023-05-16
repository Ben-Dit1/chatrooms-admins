import { useQuery } from 'react-query';
import useAxios from '../useAxios';

export function useGetOrganizationsBySignature(
  search = '',
  page = 0,
  noPaginated = false,
) {
  const { findOrganizationsBySignature } = useAxios();
  const { data, refetch } = useQuery(
    ['getOrganizationsBySignature', search, page],
    () => findOrganizationsBySignature(search, page, noPaginated),
  );
  return { data, refetch };
}
