import fs from 'node:fs';
import { Writable } from 'node:stream';
import JSONStream from 'JSONStream';
import { pipeline } from 'node:stream/promises';

async function processLargeJson(inputPath, outputPath) {
  console.log(`Processing: ${inputPath} -> ${outputPath}`);

  const readStream = fs.createReadStream(inputPath);

  // "$*" tells the parser to yield {key: "...", value: "..."} objects
  const parser = JSONStream.parse("$*");

  // Collect all entries from the stream
  const entries = [];
  const collector = new Writable({
    objectMode: true,
    write({ key, value }, _enc, cb) {
      entries.push([key, value]);
      cb();
    }
  });

  try {
    await pipeline(readStream, parser, collector);

    const obj = Object.fromEntries(entries);
    // Double-stringify: first creates the JSON string, second escapes it
    // so it can be pasted directly into a string variable
    const escaped = JSON.stringify(JSON.stringify(obj));
    fs.writeFileSync(outputPath, escaped);

    console.log("Processing complete.");
  } catch (err) {
    console.error('Pipeline error:', err);
  }
}

processLargeJson('./large-data.json', './output.txt');

let myvar = "{\"k1\":\"v1\",\"k2\":\"v2\",\"k3\":\"v3\",\"k4\":\"v4\"}";