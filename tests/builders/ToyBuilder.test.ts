import { ToyBuilder } from "../../src/model/builders/toy.builder";
import { Toy } from "../../src/model/toy.model";

describe("ToyBuilder", () => {
  let builder: ToyBuilder;

  beforeEach(() => {
    builder = new ToyBuilder();
  });

  it("should build a Toy object successfully with all required fields", () => {
    const toy = builder
      .setType("Plush Toy")
      .setAgeGroup("3+")
      .setBrand("FunTime")
      .setMaterial("Fabric")
      .setBatteryRequired(true)
      .setEducational(false)
      .build();

    expect(toy).toBeInstanceOf(Toy);
    expect(toy.getType()).toBe("Plush Toy");
    expect(toy.getAgeGroup()).toBe("3+");
    expect(toy.getBrand()).toBe("FunTime");
    expect(toy.getMaterial()).toBe("Fabric");
    expect(toy.isBatteryRequired()).toBe(true);
    expect(toy.isEducational()).toBe(false);
  });

  it("should throw an error if required fields are missing", () => {
    expect(() => {
      builder
        .setType("Puzzle")
        // Missing ageGroup, brand, material
        .setBatteryRequired(false)
        .setEducational(true)
        .build();
    }).toThrow("Missing required properties");
  });

  it("should throw an error if material is missing", () => {
    expect(() => {
      builder
        .setType("Electronic Toy")
        .setAgeGroup("6+")
        .setBrand("ElectroKids")
        // .setMaterial("Plastic") — missing on purpose
        .setBatteryRequired(true)
        .setEducational(true)
        .build();
    }).toThrow("Missing required properties");
  });

  // Edge case: empty strings should also trigger error
  it("should throw an error if a required field is an empty string", () => {
    expect(() => {
      builder
        .setType("")
        .setAgeGroup("")
        .setBrand("")
        .setMaterial("")
        .setBatteryRequired(false)
        .setEducational(false)
        .build();
    }).toThrow("Missing required properties");
  });
  
});
