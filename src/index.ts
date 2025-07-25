import logger from "./util/logger";
import { CakeBuilder } from "./model/builders/cake.builder";
import { Cake } from "model/Cake.model";
import { readCSVFile } from "./util/parsers/csvParser";
import { readJSONFile } from "./util/parsers/jsonParser";

logger.info('App started');
async function main() {
    const cakeBuilder = new CakeBuilder();
    const cake = cakeBuilder
        .setType("custom")
        .setFlavor("flavor")
        .setFilling("filling")
        .setSize(10)
        .setLayers(2)
        .setFrostingType("frostingType")
        .setFrostingFlavor("frostingFlavor")
        .setDecorationType("decorationType")
        .setDecorationColor("decorationColor")
        .setCustomMessage("customMessage")
        .setShape("shape")
        .setAllergies("allergies")
        .setSpecialIngredients("specialIngredients")
        .setPackagingType("packagingType")
        .build();
  
  console.log(cake);  
}

main();