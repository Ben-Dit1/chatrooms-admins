export type Member = {
  id: number;
  address: string;
  organization_id?: number;
};

export type Organization = {
  id: number;
  name: string;
  manager_id?: number;
};

export type Session = {
  id: number;
  name: string;
  created_by: number;
  organization_id: number;
};
