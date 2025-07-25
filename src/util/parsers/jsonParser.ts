import { promises as fs } from 'fs';

export async function readJSONFile(filePath: string): Promise<string[][]> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const parsedData = JSON.parse(fileContent);

    if (Array.isArray(parsedData)) {
      if (parsedData.length === 0) return [];

      const firstItem = parsedData[0];

      if (firstItem && typeof firstItem === 'object' && !Array.isArray(firstItem)) {
        const headers = Object.keys(firstItem);
        const rows = parsedData.map((obj: any) =>
          headers.map(header => obj[header]?.toString() ?? '')
        );
        return [headers, ...rows];
      }

      if (Array.isArray(firstItem)) {
        return parsedData.map((row: any[]) => row.map(cell => cell?.toString() ?? ''));
      }

      throw new Error('Unsupported array element type');
    }

    if (parsedData && typeof parsedData === 'object') {
      const headers = Object.keys(parsedData);
      const row = headers.map(header => parsedData[header]?.toString() ?? '');
      return [headers, row];
    }

    throw new Error('Unsupported JSON root type; expected array or object');
  } catch (error) {
    throw new Error(`Error reading JSON file: ${error}`);
  }
}

export async function writeJSONFile(filePath: string, data: string[][]): Promise<void> {
  try {
    if (data.length === 0) {
      await fs.writeFile(filePath, JSON.stringify([], null, 2), 'utf-8');
      return;
    }

    const [headers, ...rows] = data;

    const jsonArray = rows.map(row => {
      const obj: Record<string, string> = {};
      headers.forEach((header, idx) => {
        obj[header] = row[idx] ?? '';
      });
      return obj;
    });

    const jsonString = JSON.stringify(jsonArray, null, 2);
    await fs.writeFile(filePath, jsonString, 'utf-8');
  } catch (error) {
    throw new Error(`Error writing JSON file: ${error}`);
  }
}