import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { type NoteResponseDto } from '../../dto/NoteResponseDto';
import {
  getAllArchivedNotes,
  archiveNote,
  unarchiveNote,
  deleteNote,
} from '../../api/notesService';
import { NoteCard } from '../../components';
import styles from './NotesArchivedPage.module.css';

export const NotesArchivedPage = () => {

  const [notes, setNotes] = useState<NoteResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch notes from the backend
  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    setError(null); // Clear any previous errors
    try {
      const archivedNotes = await getAllArchivedNotes(); // Call the service to get archived notes
      setNotes(archivedNotes);
    } catch (err) {
      console.error('Failed to fetch archived notes:', err);
      setError('Failed to load archived notes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect hook to fetch notes when the component mounts
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]); // Dependency array includes fetchNotes to prevent stale closures

  // Handler for archiving/unarchiving a note
  const handleArchiveToggle = async (id: number, currentStatus: boolean) => {
    try {
      let updatedNote: NoteResponseDto | null;
      if (currentStatus) {
        // If currently archived, unarchive it
        updatedNote = await unarchiveNote(id);
      } else {
        // If currently active, archive it (this case shouldn't typically happen on this page)
        updatedNote = await archiveNote(id);
      }

      if (updatedNote) {
        // Update the state to reflect the change (remove from archived list if unarchived)
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note.id !== updatedNote?.id)
        );
      } else {
        // If updatedNote is null, it means the note was not found (e.g., 404)
        setError('Note not found or could not be updated.');
      }
    } catch (err) {
      console.error(`Failed to toggle archive status for note ${id}:`, err);
      setError('Failed to update note status. Please try again.');
    }
  };

  // Handler for deleting a note
  const handleDelete = async (id: number) => {

    if (!window.confirm('Are you sure you want to delete this note?')) {
      return; // If user cancels, do nothing
    }

    try {
      const success = await deleteNote(id); // Call the service to delete the note
      if (success) {
        // If deletion was successful, remove the note from the state
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      } else {
        // If success is false, it means the note was not found (e.g., 404)
        setError('Note not found or could not be deleted.');
      }
    } catch (err) {
      console.error(`Failed to delete note ${id}:`, err);
      setError('Failed to delete note. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p className={styles.loadingMessage}>Loading archived notes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.errorMessage}>{error}</p>
        <button onClick={fetchNotes} className={styles.retryButton}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Archived Notes 🗃️</h2>
      <div className={styles.actionsBar}>
        <Link to="/notes/new" className={styles.createNoteButton}>
          Create New Note
        </Link>
      </div>
      {notes.length === 0 ? (
        <p className={styles.noNotesMessage}>No archived notes found. 🌵</p>
      ) : (
        <div className={styles.notesGrid}>
          {notes.map((note) => (
            <NoteCard
              key={note.id} // Key prop for list rendering optimization
              note={note}
              onArchiveToggle={handleArchiveToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};