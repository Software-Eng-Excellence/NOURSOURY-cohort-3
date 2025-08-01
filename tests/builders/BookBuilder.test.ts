import { BookBuilder } from "../../src/model/builders/book.builder";
import { Book, BookGenre } from "../../src/model/Book.model";

describe("BookBuilder", () => {
  let builder: BookBuilder;

  beforeEach(() => {
    builder = new BookBuilder();
  });

  it("should build a Book object successfully with all required fields", () => {
    const book = builder
      .setBookTitle("Dune")
      .setAuthor("Frank Herbert")
      .setGenre("Science Fiction")
      .setFormat("Hardcover")
      .setLanguage("English")
      .setPublisher("Ace")
      .setSpecialEdition("Collector's Edition")
      .setPackaging("Boxed")
      .build();

    expect(book).toBeInstanceOf(Book);
    expect(book.getBookTitle()).toBe("Dune");
    expect(book.getAuthor()).toBe("Frank Herbert");
    expect(book.getGenre()).toBe("Science Fiction");
    expect(book.getFormat()).toBe("Hardcover");
    expect(book.getLanguage()).toBe("English");
    expect(book.getPublisher()).toBe("Ace");
    expect(book.getSpecialEdition()).toBe("Collector's Edition");
    expect(book.getPackaging()).toBe("Boxed");
  });

  it("should throw an error if a required field (genre) is missing", () => {
    expect(() => {
      builder
        .setBookTitle("1984")
        .setAuthor("George Orwell")
        // .setGenre("Thriller") — missing genre
        .setFormat("Paperback")
        .setLanguage("English")
        .setPublisher("Penguin")
        .setSpecialEdition("First Edition")
        .setPackaging("Standard")
        .build();
    }).toThrow("Missing required properties");
  });

  it("should throw an error if a field is an empty string", () => {
    expect(() => {
      builder
        .setBookTitle("")
        .setAuthor("")
        .setGenre("Mystery")
        .setFormat("")
        .setLanguage("")
        .setPublisher("")
        .setSpecialEdition("")
        .setPackaging("")
        .build();
    }).toThrow("Missing required properties");
  });

  it("should allow method chaining", () => {
    const result = builder
      .setBookTitle("The Hobbit")
      .setAuthor("J.R.R. Tolkien")
      .setGenre("Fantasy")
      .setFormat("Hardcover")
      .setLanguage("English")
      .setPublisher("HarperCollins")
      .setSpecialEdition("Illustrated")
      .setPackaging("Gift Box");

    expect(result).toBeInstanceOf(BookBuilder);
  });
});
