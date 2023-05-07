import { APIROOT } from '@/config';
import { PATHNAME } from './Pathnames';

export const Queries = {
  getOrganizations: (search: string, page?: number) =>
    APIROOT + '/organization/find?page=' + page || 0 + '&search=' + search,

  getManagerById: (id?: number) => APIROOT + '/manager/findById/' + id,

  getManagersByOrganization: (id: number, search: string, page?: number) =>
    APIROOT +
    '/manager/findByOrganization?page=' +
    (page || 0) +
    '&search=' +
    search +
    '&organizationId=' +
    id,
};
