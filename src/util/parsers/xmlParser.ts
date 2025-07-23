// xmlParser.ts
import { promises as fs } from 'fs';
import { parseStringPromise, Builder } from 'xml2js';

export async function readXMLFile(filePath: string): Promise<string[][]> {
  try {
    const xmlContent = await fs.readFile(filePath, 'utf-8');
    const parsed = await parseStringPromise(xmlContent);

    const rootKeys = Object.keys(parsed);
    if (rootKeys.length !== 1) {
      throw new Error('Unsupported XML: should have a single root element.');
    }

    const root = parsed[rootKeys[0]];
    const entries = Object.values(root).find(Array.isArray);

    if (!entries || !Array.isArray(entries)) {
      throw new Error('Unsupported XML structure: expected repeating child elements.');
    }

    const headers = Object.keys(entries[0]);
    const rows = entries.map(entry =>
      headers.map(h => (entry[h]?.[0]?.toString() ?? ''))
    );

    return [headers, ...rows];
  } catch (error) {
    throw new Error(`Error reading XML file: ${error}`);
  }
}

export async function writeXMLFile(filePath: string, data: string[][]): Promise<void> {
  try {
    if (data.length === 0) {
      throw new Error('Cannot write empty data to XML');
    }

    const [headers, ...rows] = data;

    const objects = rows.map(row => {
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        obj[h] = row[i] ?? '';
      });
      return obj;
    });

    const builder = new Builder();
    const xmlObject = { items: { item: objects } };
    const xml = builder.buildObject(xmlObject);

    await fs.writeFile(filePath, xml, 'utf-8');
  } catch (error) {
    throw new Error(`Error writing XML file: ${error}`);
  }
}
