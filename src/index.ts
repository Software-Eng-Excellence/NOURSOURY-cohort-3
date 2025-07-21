import logger from "./util/logger";

import { readCSVFile } from "./util/parser";
import { readJSONFile } from "./util/parsers/jsonParser";


async function main() {
    /*
    const data = await readCSVFile("src/data/cake-orders.csv", true);
    // for each data row, log the row
    data.forEach((row) => logger.info(row));
    */
   try {
       const data = await readJSONFile("src/data/book.json");
       console.log('Read data:', data);
   } catch (error) {
       logger.error("Error reading JSON file:", error);
   }
}

main();