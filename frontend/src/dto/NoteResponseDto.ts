/**
 * Data Transfer Object (DTO) for representing a Note received from the backend.
 * This structure matches the response body from the backend's note retrieval endpoints.
 */
export interface NoteResponseDto {
  id: number;
  title: string;
  content: string;
  // LocalDateTime in Java maps to string (ISO 8601 format) when sent over HTTP/JSON
  createdAt: string;
  lastModifiedAt: string;
  archived: boolean;
}
