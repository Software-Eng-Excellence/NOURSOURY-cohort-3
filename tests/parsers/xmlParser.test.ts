import { readXMLFile, writeXMLFile } from '../../src/util/parsers/xmlParser';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

const tempFilePath = path.join(__dirname, '../tests/data/temp-output.xml');
const validXMLFilePath = path.join(__dirname, '../tests/data/toy.xml');
const invalidXMLFilePath = path.join(__dirname, '../tests/data/bad.xml');

afterAll(async () => {
    // Cleanup the temp file if it exists
    try {
        await fs.unlink(tempFilePath);
    } catch {

    }
});

describe('xmlParser', () => {
    const tempFilePath = path.join(os.tmpdir(), 'test.xml');

    it('writes a 2D array to an XML file and reads it back correctyl', async () => {
        const testData = [
            ['title', 'author', 'year'],
            ['The Hobbit', 'J.R.R. Tolkien', '1937'],
            ['1984', 'George Orwell', '1949'],
        ];

        await writeXMLFile(tempFilePath, testData);
        const readBackData = await readXMLFile(tempFilePath);
        expect(readBackData).toEqual(testData);
    });

    it('should throw an error when trying to write empty data to XML', async () => {
        await expect(writeXMLFile(tempFilePath, [])).rejects.toThrow('Cannot write empty data to XML');
    });
    it('should correctly read and parse a well-formed XML file into a 2D array', async () => {
        const result = await readXMLFile(tempFilePath);
        expect(result).toEqual([
            ['title', 'author', 'year'],
            ['The Hobbit', 'J.R.R. Tolkien', '1937'],
            ['1984', 'George Orwell', '1949']
        ]);
    });
});

afterEach(async () => {
    try {
        await fs.unlink(tempFilePath);
    } catch (_) {}
});