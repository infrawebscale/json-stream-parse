# large-json-processor

A Node.js utility for processing large JSON files using streaming, avoiding the memory overhead of loading an entire JSON document at once.

## What it does

`process-json.js` reads a large JSON object from disk as a stream, parses it key-by-key using `JSONStream`, then writes the result as a double-stringified (escaped) JSON string to an output file. The escaped output can be pasted directly into a string variable in source code.

## Why streaming?

Loading large JSON files with `JSON.parse()` requires the entire file to fit in memory. This project uses `JSONStream` (backed by `jsonparse`) to parse the file incrementally as it streams off disk, keeping memory usage low regardless of file size.

## Usage

```bash
node process-json.js
```

By default it reads `./large-data.json` and writes to `./output.txt`. Edit the `processLargeJson(...)` call at the bottom of the file to change paths.

## Output format

The output file contains a double-stringified JSON string — i.e. the parsed object is serialized to JSON, then that JSON string is serialized again so it is fully escaped and ready to embed as a string literal:

```
"{\"k1\":\"v1\",\"k2\":\"v2\",...}"
```

## Dependencies

| Package | Purpose |
|---|---|
| [`JSONStream`](https://github.com/dominictarr/JSONStream) | Streaming JSON parser/stringifier |
| `jsonparse` | Low-level incremental JSON parser (transitive dep of JSONStream) |
| `through` | Stream utility (transitive dep of JSONStream) |

## Requirements

- Node.js with ES module support (`"type": "module"` in `package.json`)
- npm / node_modules installed (`npm install`)
