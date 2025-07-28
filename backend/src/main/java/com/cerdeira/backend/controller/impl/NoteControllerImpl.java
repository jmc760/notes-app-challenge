package com.cerdeira.backend.controller.impl;

import com.cerdeira.backend.controller.NoteController;
import com.cerdeira.backend.dto.NoteRequestDto;
import com.cerdeira.backend.dto.NoteResponseDto;
import com.cerdeira.backend.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api") // Defines the base prefix for all endpoints in this controller
@CrossOrigin(origins = "http://localhost:5173")
// Allows requests from Vite frontend's origin.
// In production, this should be the frontend's actual domain (e.g., https://notes-app.com)
public class NoteControllerImpl implements NoteController {

    private final NoteService noteService;

    @Autowired // Service dependency injection
    public NoteControllerImpl(NoteService noteService) {
        this.noteService = noteService;
    }

    @Override
    public ResponseEntity<NoteResponseDto> createNote(NoteRequestDto noteDto) {
        NoteResponseDto createdNote = noteService.createNote(noteDto);
        return new ResponseEntity<>(createdNote, HttpStatus.CREATED); // Returns 201 Created
    }

    @Override
    public ResponseEntity<NoteResponseDto> getNoteById(Long id) {
        return noteService.getNoteById(id)
                .map(noteDto -> new ResponseEntity<>(noteDto, HttpStatus.OK)) // Returns 200 OK if found
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)); // Returns 404 Not Found if not found
    }

    @Override
    public ResponseEntity<List<NoteResponseDto>> getAllActiveNotes() {
        List<NoteResponseDto> activeNotes = noteService.getAllActiveNotes();
        return new ResponseEntity<>(activeNotes, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<NoteResponseDto>> getAllArchivedNotes() {
        List<NoteResponseDto> archivedNotes = noteService.getAllArchivedNotes();
        return new ResponseEntity<>(archivedNotes, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<NoteResponseDto> updateNote(Long id, NoteRequestDto noteDto) {
        return noteService.updateNote(id, noteDto)
                .map(noteResponseDto -> new ResponseEntity<>(noteResponseDto, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<NoteResponseDto> archiveNote(Long id) {
        return noteService.archiveNote(id)
                .map(noteResponseDto -> new ResponseEntity<>(noteResponseDto, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<NoteResponseDto> unarchiveNote(Long id) {
        return noteService.unarchiveNote(id)
                .map(noteResponseDto -> new ResponseEntity<>(noteResponseDto, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<Void> deleteNote(Long id) {
        boolean deleted = noteService.deleteNote(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND); // Returns 204 No Content if deleted, 404 Not Found if not found
    }
}
