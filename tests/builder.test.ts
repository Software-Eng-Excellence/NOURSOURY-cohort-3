import { CakeBuilder } from "../src/model/builders/cake.builder";

try {
    const cake = CakeBuilder.newBuilder()
        .setType("Birthday")
        .setFlavor("Vanilla")
        .setFilling("Strawberry")
        // .setSize(8) <-- simulate missing
        .setLayers(2)
        .setFrostingType("Buttercream")
        .setFrostingFlavor("Vanilla")
        .setDecorationType("Sprinkles")
        .setDecorationColor("Pink")
        .setCustomMessage("Happy Birthday!")
        .setShape("Round")
        .setAllergies("None")
        .setSpecialIngredients("Organic eggs")
        .setPackagingType("Box")
        .build();
} catch (err) {
    console.error("Caught error:", err.message);
}
