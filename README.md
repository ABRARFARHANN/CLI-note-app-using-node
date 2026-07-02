# Ternote

A simple Node.js command-line note app with local JSON storage and a lightweight web view.

## Features

- Create notes from the terminal
- Attach tags to notes
- List all saved notes
- Search notes by text
- Remove notes by id
- Clear all notes
- Open notes in a browser-based web view

## Installation

```bash
npm install
```

## Usage

This project exposes a CLI named `note`.

### Create a note

```bash
node index.js new "Buy milk" --tags grocery,home
```

### List all notes

```bash
node index.js all
```

### Find notes

```bash
node index.js find milk
```

### Remove a note

```bash
node index.js remove 1234567890
```

### Clear all notes

```bash
node index.js clean
```

### Open the web view

```bash
node index.js web
```

You can also choose a custom port:

```bash
node index.js web 3000
```

## Data storage

Notes are stored locally in `db.json` at the project root. This means your notes persist between runs without needing a separate database.

## Project structure

- `index.js` - CLI entry point
- `src/command.js` - CLI commands and argument parsing
- `src/notes.js` - note CRUD logic
- `src/db.js` - file-based database helpers
- `src/server.js` - HTTP server for the web view
- `src/template.html` - HTML template for the browser UI
- `src/utils.js` - note display helpers
- `tests/notes.test.js` - unit tests

## Running tests

```bash
npm test
```
