package com.cerdeira.backend.controller;

import com.cerdeira.backend.dto.NoteRequestDto;
import com.cerdeira.backend.dto.NoteResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface NoteController {

    @PostMapping("/notes")
    ResponseEntity<NoteResponseDto> createNote(@RequestBody NoteRequestDto noteDto);

    @GetMapping("/notes/{id}")
    ResponseEntity<NoteResponseDto> getNoteById(@PathVariable Long id);

    @GetMapping("/notes/active")
    ResponseEntity<List<NoteResponseDto>> getAllActiveNotes();

    @GetMapping("/notes/archived")
    ResponseEntity<List<NoteResponseDto>> getAllArchivedNotes();

    @PutMapping("/notes/{id}")
    ResponseEntity<NoteResponseDto> updateNote(@PathVariable Long id, @RequestBody NoteRequestDto noteDto);

    @PutMapping("/notes/{id}/archive")
    ResponseEntity<NoteResponseDto> archiveNote(@PathVariable Long id);

    @PutMapping("/notes/{id}/unarchive")
    ResponseEntity<NoteResponseDto> unarchiveNote(@PathVariable Long id);

    @DeleteMapping("/notes/{id}")
    ResponseEntity<Void> deleteNote(@PathVariable Long id);
}
