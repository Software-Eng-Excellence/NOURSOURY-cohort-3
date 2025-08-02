import { IOrder } from "model/IOrder";
import { IMapper } from "./IMapper";
import { BookBuilder } from "../model/builders/book.builder";
import { Book } from "model/Book.model";


export class JsonBookMapper implements IMapper<string[], Book> {
    map(data: string[]): Book {
        return BookBuilder.newBuilder()
                        .setBookTitle(data[1])
                        .setAuthor(data[2])
                        .setGenre(data[3])
                        .setFormat(data[4])
                        .setLanguage(data[5])
                        .setPublisher(data[6])
                        .setSpecialEdition(data[7])
                        .setPackaging(data[8])
                        .build();

    }
    
}