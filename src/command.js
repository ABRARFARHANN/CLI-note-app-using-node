import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  newNote,
  getAllNotes,
  findNotes,
  removeAllNotes,
  removeNote,
} from "./notes.js";
import { start } from "./server.js";
import { listNotes } from "./utils.js";

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Create a new note",
    (yargs) => {
      return yargs.positional("note", {
        describe: "The note to create",
        type: "string",
      });
    },
    async (argv) => {
      const tags = Array.isArray(argv.tags)
        ? argv.tags
        : typeof argv.tags === "string"
          ? argv.tags.split(",").filter(Boolean)
          : [];
      const note = await newNote(argv.note, tags);
      console.log(argv.note);
      console.log(tags);
    },
  )
  .option("tags", {
    alias: "t",
    describe: "Tags for the note",
    type: "array",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const notes = await getAllNotes();
      listNotes(notes);
    },
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      const matches = await findNotes(argv.filter);
      listNotes(matches);
    },
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      const id = await removeNote(argv.id);
      console.log(id);
    },
  )
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 5001,
        type: "number",
      });
    },
    async (argv) => {
      const notes = await getAllNotes();
      start(notes, argv.port);
    },
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      const newNotes = await removeAllNotes();
      console.log("Db empty");
    },
  )
  .demandCommand(1, "You need to specify a command")
  .parse();
