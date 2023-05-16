import { APIROOT } from '@/config';
import { Member, Organization, Session } from '@/constants/Types';
import Axios, { AxiosResponse } from 'axios';
const axios = Axios.create({
  baseURL: APIROOT,
});
const useAxios = () => {
  axios.interceptors.request.use(function (config) {
    config.headers.authorization = window.localStorage.getItem('chatrooms');
    return config;
  });

  const findManagersBySignature = async (
    organizationId: string,
  ): Promise<AxiosResponse<Member[]>> => {
    const managerAddress = await axios.get('/manager/findBySignature', {
      params: { organizationId },
    });
    return managerAddress;
  };

  const findOrganizationById = async (
    id: string,
  ): Promise<AxiosResponse<Organization>> => {
    const organization = await axios.get('/organization/findById/' + id);
    return organization;
  };

  const adminOrManager = async (): Promise<
    AxiosResponse<{ admin: boolean; manager: boolean }>
  > => {
    const isAdminOrManager = await axios.get('/manager/isAdminOrManager');
    return isAdminOrManager;
  };
  //get requests for managers

  const findManagerById = async (
    id: number,
  ): Promise<AxiosResponse<Member>> => {
    const manager = await axios.get(`/manager/findById/${id}`);
    return manager;
  };

  //rework done!
  const findSessionsBySignature = async (
    search: string,
    page = 0,
  ): Promise<AxiosResponse<Session[]>> => {
    const sessions = await axios.get('session/findBySignature', {
      params: { search, page },
    });
    return sessions;
  };

  const findOrganizationsBySignature = async (
    search: string,
    page = 0,
    noPaginated: boolean,
  ): Promise<AxiosResponse<Organization[]>> => {
    const organizations = await axios.get('organization/findBySignature', {
      params: { search, page },
    });
    return organizations;
  };

  //post requests

  const createOrganization = async (
    name: string,
  ): Promise<AxiosResponse<Organization>> => {
    const newOrganization = await axios.post('/organization/create', {
      name,
    });
    return newOrganization;
  };

  const updateOrganization = async (
    id: number,
    managerId?: number,
    newName?: string,
  ): Promise<AxiosResponse<Organization>> => {
    const newOrganization = await axios.post('/organization/update', {
      id,
      newManager: managerId,
      newName,
    });
    return newOrganization;
  };

  const createManager = async (
    address: string,
    organizationId: number,
  ): Promise<AxiosResponse<Member>> => {
    const newManager = await axios.post('/manager/create', {
      address,
      organizationId,
    });
    return newManager;
  };

  const createSession = async (
    name: string,
    organizationId: number,
  ): Promise<AxiosResponse<Session>> => {
    const newSession = await axios.post('/session/create', {
      name,
      organizationId,
    });
    return newSession;
  };

  const deleteManager = async (id: number) => {
    const deletedManager = await axios.post('/manager/delete', {
      managerId: id,
    });
  };

  return {
    findManagerById,
    findManagersBySignature,
    updateOrganization,
    createOrganization,
    createManager,
    createSession,
    deleteManager,
    findSessionsBySignature,
    findOrganizationsBySignature,
    adminOrManager,
    findOrganizationById,
  };
};

export default useAxios;
