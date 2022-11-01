import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientAdmGateway from "../../gateway/client-adm.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase {
  private _clientRepository: ClientAdmGateway;
  
  constructor(clientRepository: ClientAdmGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {  
      id: new Id(input.id) || new Id(),
      name: input.name,
      email: input.email,
      document: input.document,
      address: input.address,
    };

    const client = new Client(props);
    this._clientRepository.add(client);
    
    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      address: client.address, 
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}