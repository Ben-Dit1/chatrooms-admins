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

  const createManager = async (
    address: string,
    organizationId: number,
    signature: string,
  ): Promise<AxiosResponse<Member>> => {
    const newManager = await axios.post(
      '/manager/create',
      {
        address,
        organizationId,
      },
      { headers: { Authorization: signature } },
    );
    return newManager;
  };

  const createSession = async (
    name: string,
    organizationId: number,
    signature: string,
  ): Promise<AxiosResponse<Session>> => {
    const newSession = await axios.post(
      '/session/create',
      {
        name,
        organizationId,
      },
      { headers: { Authorization: signature } },
    );
    return newSession;
  };

  const deleteManager = async (id: number, signature: string) => {
    const deletedManager = await axios.post(
      '/manager/delete',
      {
        managerId: id,
      },
      { headers: { Authorization: signature } },
    );
  };

  return {
    findOrganizations,
    findManagerById,
    findManagersByOrganization,
    findSessions,
    updateOrganization,
    createOrganization,
    createManager,
    createSession,
    deleteManager,
  };
};

export default useAxios;
