import logger from "./util/logger";
import { Cake } from "model/Cake.model";
import { readCSVFile } from "./util/parsers/csvParser";
import { readJSONFile } from "./util/parsers/jsonParser";
import { CSVCakeMapper } from "./mappers/Cake.mapper";
import { CSVOrderMapper } from "./mappers/Order.mapper";
import { JsonBookMapper } from "./mappers/Book.mapper";

logger.info('App started');
async function main() {
    // const data = await readCSVFile("src/data/cake-orders.csv");
    // const cakeMapper = new CSVCakeMapper();
    // const orderMapper = new CSVOrderMapper(cakeMapper);
    // const orders = data.map(orderMapper.map.bind(orderMapper));

    // logger.info("list of orders: \n %o", orders);

    const data = await readJSONFile("src/data/book.json");
    const bookMapper = new JsonBookMapper();
    const books = data.map(bookMapper.map);

    logger.info("List of books: \n %o", books);
}

main();