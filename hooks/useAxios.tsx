import { Queries } from '@/constants/Queries';
import { Member, Organization } from '@/constants/Types';
import axios, { Axios, AxiosResponse } from 'axios';

const useAxios = () => {
  const findOrganizations = async (
    search: string,
  ): Promise<AxiosResponse<Organization[]>> => {
    const organizations = await axios.get(Queries.getOrganizations(search, 0));
    return organizations;
  };

  const findManagerById = async (
    id?: number,
  ): Promise<AxiosResponse<Member>> => {
    const manager = await axios.get(Queries.getManagerById(id));
    return manager;
  };

  const findManagersByOrganization = async (
    id: number,
    search: string,
    page?: number,
  ): Promise<AxiosResponse<Member[]>> => {
    const managers = await axios.get(
      Queries.getManagersByOrganization(id, search, page),
    );
    return managers;
  };
  return { findOrganizations, findManagerById, findManagersByOrganization };
};

export default useAxios;
