import { promises as fs } from 'fs';
import { parse as csvParse } from 'csv-parse';
import { stringify as csvStringify } from 'csv-stringify';

/**
 * Reads a CSV and returns its content as a 2D array of strings
 * @param {string} filePath - The path to the CSV file
 * @returns {Promise<string[][]>} - A promise that resolves to a 2D array of strings
 */

export async function readCSVFile(filePath: string, includeHeafer: boolean = false): Promise<string[][]> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return new Promise((resolve, reject) => {
            csvParse(fileContent, {
                trim: true,
                skip_empty_lines: true,
            }, (err, records: string[][]) => {
                if (err) reject(err);
                if (includeHeafer) records.shift();
                resolve(records);
        });
    });
    
} catch (error) {
    throw new Error(`Error reading CSV file: ${error}`);
}
}

/**
 * Writes a 2D array of strings to a CSV file
 * @param filePath - The path to the CSV file
 * @param data - The 2D array of strings to write
 * @returns Promise<void>
 */

export async function writeCSVFile(filePath: string, data: string[][]): Promise<void> {
    try {
        const csvContent = await new Promise<string>((resolve, reject) => {
            csvStringify(data, { header: true }, (err, output) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(output);
                }
            });
        });
        await fs.writeFile(filePath, csvContent, 'utf-8');
    } catch (error) {
        throw new Error(`Error writing CSV file: ${error}`);
    }
}
