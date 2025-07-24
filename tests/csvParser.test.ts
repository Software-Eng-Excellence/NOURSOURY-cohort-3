import { readCSVFile, writeCSVFile } from '../src/util/parsers/csvParser';
import { promises as fs, read } from 'fs';
import path from 'path';

const tempFilePath = path.join(__dirname, '../tests/data/temp-output.csv');
const validCSVFilePath = path.join(__dirname, '../tests/data/cake-orders.csv');
const invalidCSVFilePath = path.join(__dirname, '../tests/data/bad.csv');

afterAll(async () => {
    try {
        await fs.unlink(tempFilePath);
    } catch {

    }
});

describe('csvParser', () => {
    it('reads a CSV file and returns a 2D array of strings', async () => {
        const filePath = path.join(__dirname, '../tests/data/sample.csv');
        const sampleCSV = `name,age,city
Alice,30,New York
Bob,25,Los Angeles
Charlie,35,Chicago`;
    await fs.writeFile(filePath, sampleCSV, 'utf8');

    const result = await readCSVFile(filePath);

    expect(result).toEqual([
        ['name', 'age', 'city'],
        ['Alice', '30', 'New York'],
        ['Bob', '25', 'Los Angeles'],
        ['Charlie', '35', 'Chicago']
    ]);
    await fs.unlink(filePath); // cleanup
    });

    it('reads a valid CSV file and returns a 2D array', async () => {
        const result = await readCSVFile(validCSVFilePath);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(1);

        // Check that first row is headers
        expect(result[0]).toEqual(expect.arrayContaining(["id", "Type", "Flavor", "Filling", "Size", "Layers", "Frosting Type", "Frosting Flavor", "Decoration Type", "Decoration Color"]));
        // Check that second row has strings
        expect(typeof result[1][0]).toBe('string');
    });

    it('writes a 2D array to a CSV file and reads it back correctly', async () => {
        const objectData = [
            { title: 'The Hobbit', author: 'J.R.R Tolkien', year: '1937' },
            { title: '1984', author: 'George Orwell', year: '1949' },
          ];

          const expected2DArray = [
            ['title', 'author', 'year'],
            ['The Hobbit', 'J.R.R Tolkien', '1937'],
            ['1984', 'George Orwell', '1949'],
          ];

          await writeCSVFile(tempFilePath, objectData as any);
          const readBackData = await readCSVFile(tempFilePath);
          expect(readBackData).toEqual(expected2DArray);
    });
})