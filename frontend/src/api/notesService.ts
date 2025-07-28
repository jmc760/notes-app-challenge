import axios from 'axios';
import { type NoteRequestDto } from '../dto/NoteRequestDto';
import { type NoteResponseDto } from '../dto/NoteResponseDto';

// Define the base URL of your backend API
// When running in Docker with Nginx proxy, this should be a relative path.
// Nginx will intercept /api/ and proxy it to the backend service.
const API_BASE_URL = '/api/notes';

/**
 * Creates a new note in the backend.
 * @param noteData The data of the note to create (title and content).
 * @returns The created note, including its ID and timestamps.
 */
export const createNote = async (noteData: NoteRequestDto): Promise<NoteResponseDto> => {
  try {
    const response = await axios.post<NoteResponseDto>(API_BASE_URL, noteData);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error; // Propagate the error for the component to handle
  }
};

/**
 * Retrieves a specific note by its ID.
 * @param id The ID of the note to retrieve.
 * @returns The found note or null if it does not exist.
 */
export const getNoteById = async (id: number): Promise<NoteResponseDto | null> => {
  try {
    const response = await axios.get<NoteResponseDto>(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    // If the note is not found, the backend returns 404. Axios throws an error.
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null; // Return null if the note is not found
    }
    console.error(`Error fetching note with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Retrieves all active (non-archived) notes.
 * @returns A list of active notes.
 */
export const getAllActiveNotes = async (): Promise<NoteResponseDto[]> => {
  try {
    const response = await axios.get<NoteResponseDto[]>(`${API_BASE_URL}/active`);
    return response.data;
  } catch (error) {
    console.error('Error fetching active notes:', error);
    throw error;
  }
};

/**
 * Retrieves all archived notes.
 * @returns A list of archived notes.
 */
export const getAllArchivedNotes = async (): Promise<NoteResponseDto[]> => {
  try {
    const response = await axios.get<NoteResponseDto[]>(`${API_BASE_URL}/archived`);
    return response.data;
  } catch (error) {
    console.error('Error fetching archived notes:', error);
    throw error;
  }
};

/**
 * Updates an existing note.
 * @param id The ID of the note to update.
 * @param noteData The new note data (title and content).
 * @returns The updated note.
 */
export const updateNote = async (id: number, noteData: NoteRequestDto): Promise<NoteResponseDto | null> => {
  try {
    const response = await axios.put<NoteResponseDto>(`${API_BASE_URL}/${id}`, noteData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null; // Return null if the note to update is not found
    }
    console.error(`Error updating note with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Archives a note.
 * @param id The ID of the note to archive.
 * @returns The archived note.
 */
export const archiveNote = async (id: number): Promise<NoteResponseDto | null> => {
  try {
    const response = await axios.put<NoteResponseDto>(`${API_BASE_URL}/${id}/archive`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null; // Return null if the note to archive is not found
    }
    console.error(`Error archiving note with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Unarchives a note.
 * @param id The ID of the note to unarchive.
 * @returns The unarchived note.
 */
export const unarchiveNote = async (id: number): Promise<NoteResponseDto | null> => {
  try {
    const response = await axios.put<NoteResponseDto>(`${API_BASE_URL}/${id}/unarchive`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null; // Return null if the note to unarchive is not found
    }
    console.error(`Error unarchiving note with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a note by its ID.
 * @param id The ID of the note to delete.
 * @returns true if the deletion was successful, false if the note was not found.
 */
export const deleteNote = async (id: number): Promise<boolean> => {
  try {
    // The backend returns 204 No Content for successful deletion, 404 Not Found if it doesn't exist.
    await axios.delete(`${API_BASE_URL}/${id}`);
    return true; // Successful deletion
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return false; // The note was not found for deletion
    }
    console.error(`Error deleting note with ID ${id}:`, error);
    throw error;
  }
};
