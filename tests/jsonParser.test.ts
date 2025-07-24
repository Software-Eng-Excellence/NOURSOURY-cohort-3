// tests/jsonParser.test.ts

import { readJSONFile, writeJSONFile } from '../src/util/parsers/jsonParser';
import { promises as fs } from 'fs';
import path from 'path';

const tempFilePath = path.join(__dirname, '../tests/data/temp-output.json');
const validJSONFilePath = path.join(__dirname, '../tests/data/book.json');
const invalidJSONFilePath = path.join(__dirname, '../tests/data/bad.json');

afterAll(async () => {
  // Cleanup the temp file if it exists
  try {
    await fs.unlink(tempFilePath);
  } catch {
    // ignore error if file doesn't exist
  }
});

it('reads an array of arrays and converts all elements to strings', async () => {
    const filePath = path.join(__dirname, '../src/data/arrayOfArrays.json');
    const sampleArray = [
      ['name', 'age', 'city'],
      ['Alice', 30, 'New York'],
      ['Bob', 25, null]
    ];
    await fs.writeFile(filePath, JSON.stringify(sampleArray), 'utf8');
  
    const result = await readJSONFile(filePath);
  
    expect(result).toEqual([
      ['name', 'age', 'city'],
      ['Alice', '30', 'New York'],
      ['Bob', '25', '']
    ]);
  
    await fs.unlink(filePath); // cleanup
  });
  

describe('jsonParser', () => {
  it('reads a valid JSON file (array of objects) and returns 2D array', async () => {
    const result = await readJSONFile(validJSONFilePath);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(1);

    // Check that first row is headers
    expect(result[0]).toEqual(expect.arrayContaining(['Order ID', 'Book Title']));
    // Check that second row has strings
    expect(typeof result[1][0]).toBe('string');
  });

  it('writes a 2D array to a JSON file and reads it back correctly', async () => {
    const testData = [
      ['title', 'author', 'year'],
      ['The Hobbit', 'J.R.R. Tolkien', '1937'],
      ['1984', 'George Orwell', '1949'],
    ];

    await writeJSONFile(tempFilePath, testData);
    const readBackData = await readJSONFile(tempFilePath);
    expect(readBackData).toEqual(testData);
  });

  it('reads a single JSON object and converts it to 2D array', async () => {
    // Prepare single object file
    const singleObject = { name: 'Alice', age: 30, city: 'Paris' };
    await fs.writeFile(tempFilePath, JSON.stringify(singleObject, null, 2), 'utf-8');

    const result = await readJSONFile(tempFilePath);

    expect(result).toEqual([
      ['name', 'age', 'city'],
      ['Alice', '30', 'Paris'],
    ]);
  });

  it('throws error on invalid JSON file', async () => {
    // Write invalid JSON content
    await fs.writeFile(invalidJSONFilePath, '{ bad json ', 'utf-8');

    await expect(readJSONFile(invalidJSONFilePath)).rejects.toThrow('Error reading JSON file');
  });

  
  
  it('should throw an error if the JSON file does not exist', async () => {
    await expect(readJSONFile(path.join(__dirname, 'data', 'nonexistent.json')))
      .rejects
      .toThrow('Error reading JSON file');
  });

  it('writes empty 2D array as empty JSON array', async () => {
    await writeJSONFile(tempFilePath, []);
    const content = await fs.readFile(tempFilePath, 'utf-8');
    expect(content.trim()).toBe('[]');
  });

  it('handles JSON array with objects having different keys (missing fields)', async () => {
    const inconsistentData = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', city: 'New York' }
    ];
    await fs.writeFile(tempFilePath, JSON.stringify(inconsistentData, null, 2), 'utf-8');
  
    const result = await readJSONFile(tempFilePath);
  
    // Headers should be union of all keys in first object only, your parser logic picks keys from first item
    expect(result[0]).toEqual(['name', 'age']);
  
    // Rows reflect values accordingly; missing fields produce empty strings
    expect(result).toEqual([
      ['name', 'age'],
      ['Alice', '30'],
      ['Bob', ''], // 'age' missing, so empty string
    ]);
  });

  it('throws error when writing to an invalid path', async () => {
    const invalidPath = '/invalid/path/output.json';
    const data = [['name', 'age'], ['Alice', '30']];
  
    await expect(writeJSONFile(invalidPath, data)).rejects.toThrow();
  });
  
  
  
});
