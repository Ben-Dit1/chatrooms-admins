import { APIROOT } from '@/config';
import { Member, Organization, Session } from '@/constants/Types';
import Axios, { AxiosResponse } from 'axios';

const useAxios = () => {
  const axios = Axios.create({
    baseURL: APIROOT,
  });

  //get requests

  const findOrganizations = async (
    search: string,
    page: number = 0,
    signature: string,
  ): Promise<AxiosResponse<Organization[]>> => {
    const organizations = await axios.get('/organization/find', {
      headers: {
        Authorization: signature,
      },
      params: { search, page },
    });
    return organizations;
  };

  const findSessions = async (
    search: string,
    page: number = 0,
    signature: string,
  ): Promise<AxiosResponse<Session[]>> => {
    const organizations = await axios.get('/session/find', {
      headers: {
        Authorization: signature,
      },
      params: { search, page },
    });
    return organizations;
  };

  const findManagerById = async (
    id: number,
    signature: string,
  ): Promise<AxiosResponse<Member>> => {
    const manager = await axios.get(`/manager/findById/${id}`, {
      headers: {
        Authorization: signature,
      },
    });
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

  //post requests

  const createOrganization = async (
    name: string,
    signature: string,
  ): Promise<AxiosResponse<Organization>> => {
    const newOrganization = await axios.post(
      '/organization/create',
      {
        name,
      },
      { headers: { Authorization: signature } },
    );
    return newOrganization;
  };

  const updateOrganization = async (
    id: number,
    signature: string,
    managerId?: number,
    newName?: string,
  ): Promise<AxiosResponse<Organization>> => {
    const newOrganization = await axios.post(
      '/organization/update',
      {
        id,
        newManager: managerId,
        newName,
      },
      { headers: { Authorization: signature } },
    );
    return newOrganization;
  };

  return {
    findOrganizations,
    findManagerById,
    findManagersByOrganization,
    findSessions,
    updateOrganization,
    createOrganization,
  };
};

export default useAxios;
