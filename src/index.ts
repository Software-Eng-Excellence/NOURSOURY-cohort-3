import logger from "./util/logger";
import { Cake } from "model/Cake.model";
import { readCSVFile } from "./util/parsers/csvParser";
import { readJSONFile } from "./util/parsers/jsonParser";
import { CSVCakeMapper } from "./mappers/Cake.mapper";
import { CSVOrderMapper } from "./mappers/Order.mapper";
import { JsonBookMapper } from "./mappers/Book.mapper";
import { readXMLFile } from "./util/parsers/xmlParser";
import { XMLToyMapper } from "./mappers/Toy.mapper";

logger.info('App started');
async function main() {
    // const data = await readCSVFile("src/data/cake-orders.csv");
    // const cakeMapper = new CSVCakeMapper();
    // const orderMapper = new CSVOrderMapper(cakeMapper);
    // const orders = data.map(orderMapper.map.bind(orderMapper));

    // logger.info("list of orders: \n %o", orders);

    // const data = await readJSONFile("src/data/book.json");
    // const bookMapper = new JsonBookMapper();
    // const books = data.map(bookMapper.map);

    // logger.info("List of books: \n %o", books);

    const data = await readXMLFile("src/data/toy.xml");
    const toyMapper = new XMLToyMapper();
    const toys = data.map(toyMapper.map);

    logger.info("List of toys: \n %o", toys);
}

main();