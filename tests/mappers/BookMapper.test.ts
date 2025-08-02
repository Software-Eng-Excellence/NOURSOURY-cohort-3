import { JsonBookMapper } from "../../src/mappers/Book.mapper";
import { Book } from "../../src/model/Book.model";
import { ItemCategory } from "../../src/model/IItem";

describe("JsonBookMapper", () => {
  it("should map valid data array to a Book object", () => {
    const data = [
      "1001",
      "The Great Gatsby",
      "F. Scott Fitzgerald",
      "Historical Fiction",
      "Hardcover",
      "English",
      "Scribner",
      "No",
      "Boxed"
    ];

    const mapper = new JsonBookMapper();
    const book = mapper.map(data);

    expect(book).toBeInstanceOf(Book);
    expect(book.getBookTitle()).toBe("The Great Gatsby");
    expect(book.getAuthor()).toBe("F. Scott Fitzgerald");
    expect(book.getGenre()).toBe("Historical Fiction");
    expect(book.getFormat()).toBe("Hardcover");
    expect(book.getLanguage()).toBe("English");
    expect(book.getPublisher()).toBe("Scribner");
    expect(book.getSpecialEdition()).toBe("No");
    expect(book.getPackaging()).toBe("Boxed");
    expect(book.getCategory()).toBe(ItemCategory.BOOK);
  });

  it("should throw an error if a required field is missing", () => {
    const data = [
      "1002",
      "", // missing book title
      "Author",
      "Genre",
      "Paperback",
      "English",
      "Publisher",
      "Yes",
      "Slipcase"
    ];

    const mapper = new JsonBookMapper();
    expect(() => mapper.map(data)).toThrow("Missing required properties");
  });
});
