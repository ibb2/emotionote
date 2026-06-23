import * as Evolu from "@evolu/common";

// Primary keys are branded types, preventing accidental use of IDs across
// different tables (e.g., a TodoId can't be used where a UserId is expected).
const NoteId = Evolu.id("Note");
type NoteId = typeof NoteId.Type;

// Schema defines database structure with runtime validation.
// Column types validate data on insert/update/upsert.
const Schema = {
  _note: {
    id: NoteId,
    title: Evolu.NonEmptyString100,
    blocks: Evolu.Json,
  },
};

export { Schema };
