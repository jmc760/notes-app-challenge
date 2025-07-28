package com.cerdeira.backend.service.impl;

import com.cerdeira.backend.dto.NoteRequestDto;
import com.cerdeira.backend.dto.NoteResponseDto;
import com.cerdeira.backend.entity.Note;
import com.cerdeira.backend.repository.NoteRepository;
import com.cerdeira.backend.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;

    @Autowired // Repository dependency injection
    public NoteServiceImpl(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    // --- Methods for mapping between Entity and DTO ---

    private NoteResponseDto mapToDto(Note note) {
        if (note == null) {
            return null;
        }
        return new NoteResponseDto(
                note.getId(),
                note.getTitle(),
                note.getContent(),
                note.getCreatedAt(),
                note.getLastModifiedAt(),
                note.isArchived()
        );
    }

    private Note mapToEntity(NoteRequestDto noteDto) {
        if (noteDto == null) {
            return null;
        }
        // For creation, ID and timestamps are managed by the DB/JPA
        return new Note(noteDto.getTitle(), noteDto.getContent());
    }

    // ---------------------------------------------

    @Override
    @Transactional // Ensures the operation runs within a transaction
    public NoteResponseDto createNote(NoteRequestDto noteDto) {
        Note note = mapToEntity(noteDto);
        Note savedNote = noteRepository.save(note);
        return mapToDto(savedNote);
    }

    @Override
    @Transactional(readOnly = true) // Read-only transaction, optimizes performance
    public Optional<NoteResponseDto> getNoteById(Long id) {
        return noteRepository.findById(id).map(this::mapToDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NoteResponseDto> getAllActiveNotes() {
        return noteRepository.findByArchived(false)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<NoteResponseDto> getAllArchivedNotes() {
        return noteRepository.findByArchived(true)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Optional<NoteResponseDto> updateNote(Long id, NoteRequestDto noteDto) {
        return noteRepository.findById(id).map(existingNote -> {
            existingNote.setTitle(noteDto.getTitle());
            existingNote.setContent(noteDto.getContent());
            Note updatedNote = noteRepository.save(existingNote);
            return mapToDto(updatedNote);
        });
    }

    @Override
    @Transactional
    public Optional<NoteResponseDto> archiveNote(Long id) {
        return noteRepository.findById(id).map(note -> {
            note.setArchived(true);
            Note archivedNote = noteRepository.save(note);
            return mapToDto(archivedNote);
        });
    }

    @Override
    @Transactional
    public Optional<NoteResponseDto> unarchiveNote(Long id) {
        return noteRepository.findById(id).map(note -> {
            note.setArchived(false);
            Note unarchivedNote = noteRepository.save(note);
            return mapToDto(unarchivedNote);
        });
    }

    @Override
    @Transactional
    public boolean deleteNote(Long id) {
        if (noteRepository.existsById(id)) {
            noteRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
