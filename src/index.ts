import logger from "./util/logger";
import { CakeBuilder } from "./model/builders/cake.builder";
import { Cake } from "model/Cake.model";

import { readCSVFile } from "./util/parser";
import { readXMLFile } from "./util/parsers/xmlParser";


async function main() {
    /*
    const data = await readCSVFile("src/data/cake-orders.csv", true);
    // for each data row, log the row
    data.forEach((row) => logger.info(row));
    */

    /*
   try {
       const data = await readJSONFile("src/data/book.json");
       data.forEach((row) => {
           logger.info(row);
       });
   } catch (error) {
       logger.error("Error reading JSON file:", error);
   }
       */
       
/*
    const data = await readXMLFile("src/data/toy.xml");
    data.forEach((row) => {
        logger.info(row);
    }
    ); 
    */
}

main();