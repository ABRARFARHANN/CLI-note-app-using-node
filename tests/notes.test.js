import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote, findNotes } =
  await import("../src/notes.js");

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

test("newNote inserts data and returns it", async () => {
  const note = "Test note";
  const tags = ["tag1", "tag2"];
  const data = {
    tags,
    content: note,
    id: Date.now(),
  };
  insertDB.mockResolvedValue(data);

  const result = await newNote(note, tags);
  expect(result).toEqual(data);
});
test("getAllNotes returns all notes", async () => {
  const db = {
    notes: ["note1", "note2", "note3"],
  };
  getDB.mockResolvedValue(db);

  const result = await getAllNotes();
  expect(result).toEqual(db.notes);
});

test("removeNote does nothing if id is not found", async () => {
  const notes = [
    { id: 1, content: "note 1" },
    { id: 2, content: "note 2" },
    { id: 3, content: "note 3" },
  ];
  saveDB.mockResolvedValue(notes);

  const idToRemove = 4;
  const result = await removeNote(idToRemove);
  expect(result).toBeUndefined();
});

test("findNotes returns only the notes that match the filter case-insensitively", async () => {
  // 1. ARRANGE: Set up a fake database with mixed notes
  const mockDb = {
    notes: [
      { id: 1, content: "Buy groceries for dinner" },
      { id: 2, content: "Call Mom" },
      { id: 3, content: "Cook a nice DINNER" }, // testing uppercase too!
    ],
  };

  // Program our getDB mock to return our fake database
  getDB.mockResolvedValue(mockDb);

  // 2. ACT: Call findNotes with our search filter
  const filterTerm = "dinner";
  const result = await findNotes(filterTerm);

  // 3. ASSERT: Expect it to return an array of BOTH matching notes
  expect(result).toEqual([
    { id: 1, content: "Buy groceries for dinner" },
    { id: 3, content: "Cook a nice DINNER" },
  ]);

  // Extra Check: Ensure it didn't include the 'Call Mom' note
  expect(result).not.toContainEqual({ id: 2, content: "Call Mom" });
});
