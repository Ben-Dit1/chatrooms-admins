import { APIROOT } from '@/config';
import { Member, Organization, Session } from '@/constants/Types';
import Axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
const axios = Axios.create({
  baseURL: APIROOT,
});
const useAxios = () => {
  axios.interceptors.request.use(function (config) {
    config.headers.authorization = window.localStorage.getItem('chatrooms');
    return config;
  });

  //get requests

  const findOrganizations = async (
    search: string,
    page: number = 0,
  ): Promise<AxiosResponse<Organization[]>> => {
    const organizations = await axios.get('/organization/find', {
      params: { search, page },
    });
    return organizations;
  };

  const findSessions = async (
    search: string,
    page: number = 0,
  ): Promise<AxiosResponse<Session[]>> => {
    const organizations = await axios.get('/session/find', {
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
