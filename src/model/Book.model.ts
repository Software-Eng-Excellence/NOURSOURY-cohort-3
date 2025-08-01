import { IItem, ItemCategory } from "./IItem";

export type BookGenre = "Science Fiction" | "Thriller" | "Biography" | "Mystery" | "Fantasy" | "Romance" | "Historical Fiction";

export class Book implements IItem {
    private bookTitle: string;
    private author: string;
    private genre: BookGenre;
    private format: string;
    private language: string;
    private publisher: string;
    private specialEdition: string;
    private packaging: string;

    constructor(
        bookTitle: string,
        author: string,
        genre: BookGenre,
        format: string,
        language: string,
        publisher: string,
        specialEdition: string,
        packaging: string,
    ) {
        this.bookTitle = bookTitle;
        this.author = author;
        this.genre = genre;
        this.format = format;
        this.language = language;
        this.publisher = publisher;
        this.specialEdition = specialEdition;
        this.packaging = packaging;
    }

    getCategory(): ItemCategory {
        return ItemCategory.BOOK;
    }

    // Getters for the properties
    getBookTitle(): string {
        return this.bookTitle;
    }
    getAuthor(): string {
        return this.author;
    }
    getGenre(): BookGenre {
        return this.genre;
    }
    getFormat(): string {
        return this.format;
    }
    getLanguage(): string {
        return this.language;
    }
    getPublisher(): string {
        return this.publisher;
    }
    getSpecialEdition(): string {
        return this.specialEdition;
    }
    getPackaging(): string {
        return this.packaging;
    }
}