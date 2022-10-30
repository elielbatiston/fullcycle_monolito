import { FindClientOutputDto } from "../usecase/find-client/find-client.usecase.dto";

export interface AddClientFacadeInputDto {
  id?: string;
  name: string;
  email: string;
  address: string;
}

export interface FindClientFacadeInputDto {
  id: string;
}

export interface FindClientFacadeOutputDto {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
