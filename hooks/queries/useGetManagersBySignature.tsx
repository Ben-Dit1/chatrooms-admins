import { useQuery } from 'react-query';
import useAxios from '../useAxios';

export function useGetManagersBySignature(organizationId: string) {
  const { findManagersBySignature } = useAxios();
  const { data, refetch } = useQuery(
    ['getManagerBySignature', organizationId],
    () => findManagersBySignature(organizationId),
  );
  return { data, refetch };
}
