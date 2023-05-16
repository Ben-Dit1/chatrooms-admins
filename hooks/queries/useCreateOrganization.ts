import { useMutation } from 'react-query';
import useAxios from '../useAxios';

export function useCreateOrganization() {
  const { createOrganization } = useAxios();
  const { mutateAsync } = useMutation(['createOrganization'], (name: string) =>
    createOrganization(name),
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
