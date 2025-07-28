package com.cerdeira.backend.service;

import com.cerdeira.backend.dto.NoteRequestDto;
import com.cerdeira.backend.dto.NoteResponseDto;

import java.util.List;
import java.util.Optional;

public interface NoteService {

    /**
     * Creates a new note from the provided data.
     * @param noteDto The data of the note to create.
     * @return The created note as a response DTO.
     */
    NoteResponseDto createNote(NoteRequestDto noteDto);

    /**
     * Retrieves a note by its ID.
     * @param id The ID of the note.
     * @return An Optional containing the note DTO if found, or empty if not.
     */
    Optional<NoteResponseDto> getNoteById(Long id);

    /**
     * Retrieves all active (non-archived) notes.
     * @return A list of active note DTOs.
     */
    List<NoteResponseDto> getAllActiveNotes();

    /**
     * Retrieves all archived notes.
     * @return A list of archived note DTOs.
     */
    List<NoteResponseDto> getAllArchivedNotes();

    /**
     * Updates an existing note.
     * @param id The ID of the note to update.
     * @param noteDto The new note data.
     * @return An Optional containing the updated note DTO if found, or empty if not.
     */
    Optional<NoteResponseDto> updateNote(Long id, NoteRequestDto noteDto);

    /**
     * Archives a note.
     * @param id The ID of the note to archive.
     * @return An Optional containing the archived note DTO if found, or empty if not.
     */
    Optional<NoteResponseDto> archiveNote(Long id);

    /**
     * Unarchives a note.
     * @param id The ID of the note to unarchive.
     * @return An Optional containing the unarchived note DTO if found, or empty if not.
     */
    Optional<NoteResponseDto> unarchiveNote(Long id);

    /**
     * Deletes a note by its ID.
     * @param id The ID of the note to delete.
     * @return true if the note was successfully deleted, false otherwise.
     */
    boolean deleteNote(Long id);
}
