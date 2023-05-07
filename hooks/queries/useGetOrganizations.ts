import { useQuery } from 'react-query';
import useAxios from '../useAxios';

export function useGetOrganizations(search: string) {
  const { findOrganizations } = useAxios();
  const { data } = useQuery(['getOrganizations', search], () =>
    findOrganizations(search),
  );
  return { data };
}
