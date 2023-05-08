import { useQuery } from 'react-query';
import useAxios from '../useAxios';
import { useUserData } from '../../recoil/User/UserStoreHooks';

export function useGetOrganizations(search: string, page: number = 0) {
  const { isAdmin, signature } = useUserData();
  const { findOrganizations } = useAxios();
  const { data, refetch } = useQuery(
    ['getOrganizations', search, page],
    () => findOrganizations(search, page),
    { enabled: !isAdmin },
  );
  return { data, refetch };
}
//!isAdmin should be isAdmin
