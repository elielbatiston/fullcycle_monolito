import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/product-adm.facade.factory";
import { ProductModel } from "../repository/product.model";

describe("ProductAdmFacadeFactory test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {    
    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };

    await productFacade.addProduct(input);

    const product = await ProductModel.findOne({ where: { id: "1" } });
    expect(product.id).toBeDefined();
    expect(product.name).toEqual(input.name);
    expect(product.description).toEqual(input.description);
    expect(product.purchasePrice).toEqual(input.purchasePrice);
    expect(product.stock).toEqual(input.stock);
  });
});