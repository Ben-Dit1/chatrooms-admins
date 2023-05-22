import { useMutation } from 'react-query';
import useAxios from '../useAxios';
import { AxiosError } from 'axios';
import { success } from '../useToastify';

export function useCreateOrganization() {
  const { createOrganization } = useAxios();
  const { mutateAsync } = useMutation(
    ['createOrganization'],
    (name: string) => createOrganization(name),
    {
      onSuccess: () => success(),
    },
  );
  return { mutateAsync };
}
//!isAdmin should be isAdmin
