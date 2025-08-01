import { CakeBuilder } from "../../src/model/builders/cake.builder";
import { Cake } from "../../src/model/Cake.model";

describe("CakeBuilder", () => {
  let builder: CakeBuilder;

  beforeEach(() => {
    builder = new CakeBuilder();
  });

  it("should build a Cake object successfully with all required fields", () => {
    const cake = builder
      .setType("birthday")
      .setFlavor("Vanilla")
      .setFilling("Strawberry")
      .setSize(10)
      .setLayers(3)
      .setFrostingType("Buttercream")
      .setFrostingFlavor("Vanilla")
      .setDecorationType("Fondant")
      .setDecorationColor("Blue")
      .setCustomMessage("Happy Birthday!")
      .setShape("Round")
      .setAllergies("None")
      .setSpecialIngredients("Almond extract")
      .setPackagingType("Box")
      .build();

    expect(cake).toBeInstanceOf(Cake);
    expect(cake.getType()).toBe("birthday");
    expect(cake.getFlavor()).toBe("Vanilla");
    expect(cake.getFilling()).toBe("Strawberry");
    expect(cake.getSize()).toBe(10);
    expect(cake.getLayers()).toBe(3);
    expect(cake.getFrostingType()).toBe("Buttercream");
    expect(cake.getFrostingFlavor()).toBe("Vanilla");
    expect(cake.getDecorationType()).toBe("Fondant");
    expect(cake.getDecorationColor()).toBe("Blue");
    expect(cake.getCustomMessage()).toBe("Happy Birthday!");
    expect(cake.getShape()).toBe("Round");
    expect(cake.getAllergies()).toBe("None");
    expect(cake.getSpecialIngredients()).toBe("Almond extract");
    expect(cake.getPackagingType()).toBe("Box");
  });

  it("should throw an error if a required field is missing", () => {
    expect(() => {
      builder
        .setFlavor("Chocolate")
        .setFilling("Ganache")
        .setSize(8)
        .setLayers(2)
        .setFrostingType("Buttercream")
        .setFrostingFlavor("Chocolate")
        .setDecorationType("Sprinkles")
        .setDecorationColor("Red")
        .setCustomMessage("Congrats!")
        .setShape("Square")
        .setAllergies("Peanuts")
        .setSpecialIngredients("None")
        .setPackagingType("Plastic wrap")
        // Missing type
        .build();
    }).toThrow("Missing required properties");
  });

  it("should throw an error if a string field is empty", () => {
    expect(() => {
      builder
        .setType("wedding")
        .setFlavor("")
        .setFilling("")
        .setSize(10)
        .setLayers(3)
        .setFrostingType("")
        .setFrostingFlavor("")
        .setDecorationType("")
        .setDecorationColor("")
        .setCustomMessage("")
        .setShape("")
        .setAllergies("")
        .setSpecialIngredients("")
        .setPackagingType("")
        .build();
    }).toThrow("Missing required properties");
  });

  it("should throw an error if size or layers is 0", () => {
    expect(() => {
      builder
        .setType("custom")
        .setFlavor("Lemon")
        .setFilling("Blueberry")
        .setSize(0) // Invalid
        .setLayers(0) // Invalid
        .setFrostingType("Whipped Cream")
        .setFrostingFlavor("Lemon")
        .setDecorationType("Airbrush")
        .setDecorationColor("Green")
        .setCustomMessage("Welcome!")
        .setShape("Heart")
        .setAllergies("Eggs")
        .setSpecialIngredients("Mint")
        .setPackagingType("Cardboard")
        .build();
    }).toThrow("Missing required properties");
  });

  it("should support method chaining", () => {
    const result = builder
      .setType("anniversary")
      .setFlavor("Carrot")
      .setFilling("Cream Cheese")
      .setSize(12)
      .setLayers(2)
      .setFrostingType("Cream Cheese")
      .setFrostingFlavor("Vanilla")
      .setDecorationType("Flowers")
      .setDecorationColor("White")
      .setCustomMessage("25 Years!")
      .setShape("Square")
      .setAllergies("Gluten")
      .setSpecialIngredients("Cinnamon")
      .setPackagingType("Eco Wrap");

    expect(result).toBeInstanceOf(CakeBuilder);
  });
});
