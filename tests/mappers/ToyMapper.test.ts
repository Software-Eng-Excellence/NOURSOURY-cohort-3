import { XMLToyMapper } from "../../src/mappers/Toy.mapper";
import { Toy } from "../../src/model/toy.model";
import { ItemCategory } from "../../src/model/IItem";

describe("XMLToyMapper", () => {
  it("should map valid data array to a Toy object", () => {
    const data = ["5001", "Plush Toy", "13+", "FunTime", "Fabric", "Yes", "No"];
    const mapper = new XMLToyMapper();
    const toy = mapper.map(data);

    expect(toy).toBeInstanceOf(Toy);
    expect(toy.getType()).toBe("Plush Toy");
    expect(toy.getAgeGroup()).toBe("13+");
    expect(toy.getBrand()).toBe("FunTime");
    expect(toy.getMaterial()).toBe("Fabric");
    expect(toy.isBatteryRequired()).toBe(true);
    expect(toy.isEducational()).toBe(false);
    expect(toy.getCategory()).toBe(ItemCategory.TOY);
  });

  it("should throw error when required fields are missing", () => {
    const data = ["5002", "", "3+", "BrandX", "Plastic", "Yes", "Yes"]; // Missing type
    const mapper = new XMLToyMapper();

    expect(() => mapper.map(data)).toThrow("Missing required properties");
  });
});
