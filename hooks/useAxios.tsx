import { APIROOT } from '@/config';
import { Member, Organization } from '@/constants/Types';
import Axios, { AxiosResponse } from 'axios';

const useAxios = () => {
  const axios = Axios.create({
    baseURL: APIROOT,
  });

  const findOrganizations = async (
    search: string,
    page: number = 0,
  ): Promise<AxiosResponse<Organization[]>> => {
    const organizations = await axios.get('/organization/find', {
      params: { search, page },
    });
    return organizations;
  };

  const findManagerById = async (
    id: number,
  ): Promise<AxiosResponse<Member>> => {
    const manager = await axios.get(`/manager/findById/${id}`);
    return manager;
  };

  const findManagersByOrganization = async (
    id: number,
    search: string,
    page: number = 0,
  ): Promise<AxiosResponse<Member[]>> => {
    const managers = await axios.get('/manager/findByOrganization', {
      params: {
        organizationId: id,
        search,
        page,
      },
    });
    return managers;
  };
  return { findOrganizations, findManagerById, findManagersByOrganization };
};

export default useAxios;
