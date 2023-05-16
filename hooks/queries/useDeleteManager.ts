import { useMutation } from 'react-query';
import useAxios from '../useAxios';

export function useDeleteManager() {
  const { deleteManager } = useAxios();
  const { mutateAsync } = useMutation(['deleteManager'], (id: number) =>
    deleteManager(id),
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
