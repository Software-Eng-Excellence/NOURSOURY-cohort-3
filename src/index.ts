import logger from "./util/logger";
import { CakeOrderRepository } from "./repository/file/CakeOrder.repository";
import config from "./config";

logger.info('App started');
async function main() {
    const path = config.storagePath.csv.cake;

    const repository = new CakeOrderRepository(path);
    const data = await repository.get("17");


    logger.info("list of orders: \n %o", data);
}

main();