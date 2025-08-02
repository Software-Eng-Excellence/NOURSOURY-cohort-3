import { CSVCakeMapper } from "../../src/mappers/Cake.mapper";
import { Cake } from "../../src/model/Cake.model";
import { ItemCategory } from "../../src/model/IItem";

describe("CSVCakeMapper", () => {
  it("should map a valid CSV row to a Cake object", () => {
    const data = [
      "0",                      // ID (ignored)
      "birthday",              // type
      "Vanilla",               // flavor
      "Cream",                 // filling
      "20",                    // size
      "2",                     // layers
      "Buttercream",           // frostingType
      "Vanilla",               // frostingFlavor
      "Sprinkles",             // decorationType
      "Multi-color",           // decorationColor
      "Happy Birthday",        // customMessage
      "Round",                 // shape
      "Nut-Free",              // allergies
      "Organic Ingredients",   // specialIngredients
      "Standard Box"           // packagingType
    ];

    const mapper = new CSVCakeMapper();
    const cake = mapper.map(data);

    expect(cake).toBeInstanceOf(Cake);
    expect(cake.getType()).toBe("birthday");
    expect(cake.getFlavor()).toBe("Vanilla");
    expect(cake.getFilling()).toBe("Cream");
    expect(cake.getSize()).toBe(20);
    expect(cake.getLayers()).toBe(2);
    expect(cake.getFrostingType()).toBe("Buttercream");
    expect(cake.getFrostingFlavor()).toBe("Vanilla");
    expect(cake.getDecorationType()).toBe("Sprinkles");
    expect(cake.getDecorationColor()).toBe("Multi-color");
    expect(cake.getCustomMessage()).toBe("Happy Birthday");
    expect(cake.getShape()).toBe("Round");
    expect(cake.getAllergies()).toBe("Nut-Free");
    expect(cake.getSpecialIngredients()).toBe("Organic Ingredients");
    expect(cake.getPackagingType()).toBe("Standard Box");
    expect(cake.getCategory()).toBe(ItemCategory.CAKE);
  });

  it("should throw an error if a required field is missing", () => {
    const incompleteData = [
      "0",
      "",                      // missing type
      "Vanilla",
      "Cream",
      "20",
      "2",
      "Buttercream",
      "Vanilla",
      "Sprinkles",
      "Multi-color",
      "Happy Birthday",
      "Round",
      "Nut-Free",
      "Organic Ingredients",
      "Standard Box"
    ];

    const mapper = new CSVCakeMapper();
    expect(() => mapper.map(incompleteData)).toThrow("Missing required properties");
  });
});
