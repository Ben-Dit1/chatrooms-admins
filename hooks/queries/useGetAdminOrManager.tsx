import { useQuery } from 'react-query';
import useAxios from '../useAxios';

export function useAdminOrManager() {
  const { adminOrManager } = useAxios();
  const { data, refetch } = useQuery(['isAdminOrManager'], () =>
    adminOrManager(),
  );
  return { data, refetch };
}
