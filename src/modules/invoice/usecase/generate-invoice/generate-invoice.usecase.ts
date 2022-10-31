import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./gererate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase {
  private _invoiceRepository: InvoiceGateway;
  
  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const props = {
      id: new Id(input.id) || new Id(),   
      name: input.name,      
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      }),
      items: input.items.map((items) => 
        new Product({
          id: new Id(items.id),
          name: items.name,
          price: items.price,
        })
      ),      
    };
  
    const invoice = new Invoice(props);
    await this._invoiceRepository.generate(invoice);
    
    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((items) => ({
        id: items.id.id,
        name: items.name,
        price: items.price,
      })),
      total: invoice.items.reduce((acc, item) => (acc + item.price), 0),
    };
  }
}