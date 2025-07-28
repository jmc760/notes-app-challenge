/**
 * Data Transfer Object (DTO) for creating or updating a Note.
 * This structure matches the expected request body for the backend's note creation and update endpoints.
 */
export interface NoteRequestDto {
  title: string;
  content: string;
  // 'archived' is intentionally omitted here as its state is managed by specific backend endpoints
  // (archive/unarchive) or defaults to false on creation.
}
