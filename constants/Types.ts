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
  createdBy: string;
  organizationId: number;
};
