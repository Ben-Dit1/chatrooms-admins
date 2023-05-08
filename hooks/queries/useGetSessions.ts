import { useQuery } from 'react-query';
import useAxios from '../useAxios';
import { useUserData } from '../../recoil/User/UserStoreHooks';

export function useGetSessions(search: string, page: number = 0) {
  const { isAdmin, signature } = useUserData();
  const { findSessions } = useAxios();
  const { data } = useQuery(
    ['getSessions', search],
    () => findSessions(search, page, signature),
    { enabled: !isAdmin && signature.length > 0 },
  );
  return { data };
}
//!isAdmin should be isAdmin
