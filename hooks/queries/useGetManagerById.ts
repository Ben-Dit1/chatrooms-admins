import { useQuery } from 'react-query';
import useAxios from '../useAxios';
import { useUserData } from '@/recoil/User/UserStoreHooks';

export function useGetManagerById(id?: number) {
  const { findManagerById } = useAxios();
  const { signature } = useUserData();
  const { data } = useQuery(
    ['getManagerById', id],
    () => findManagerById(id || 0, signature),
    {
      enabled: id != null && signature.length > 0,
    },
  );
  return { data };
}
