import { useQuery } from 'react-query';
import useAxios from '../useAxios';
import { useUserData } from '../../recoil/User/UserStoreHooks';

export function useGetOrganizations(search: string) {
  const { isAdmin } = useUserData();
  const { findOrganizations } = useAxios();
  const { data } = useQuery(
    ['getOrganizations', search],
    () => findOrganizations(search),
    { enabled: !isAdmin },
  );
  return { data };
}
//!isAdmin should be isAdmin
