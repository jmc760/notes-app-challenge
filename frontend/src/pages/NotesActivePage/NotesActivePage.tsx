import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { type NoteResponseDto } from '../../dto/NoteResponseDto';
import {
  getAllActiveNotes,
  archiveNote,
  unarchiveNote,
  deleteNote,
} from '../../api/notesService';
import { NoteCard } from '../../components';
import styles from './NotesActivePage.module.css';

export const NotesActivePage = () => {

  const [notes, setNotes] = useState<NoteResponseDto[]>([]); // State to store active notes
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch notes from the backend
  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    setError(null); // Clear any previous errors
    try {
      const activeNotes = await getAllActiveNotes(); // Call the service to get active notes
      setNotes(activeNotes);
    } catch (err) {
      console.error('Failed to fetch active notes:', err);
      setError('Failed to load notes. Please try again later.');
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
        // If currently active, archive it
        updatedNote = await archiveNote(id);
      }

      if (updatedNote) {
        // Update the state to reflect the change (remove from active list if archived)
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
        <p className={styles.loadingMessage}>Loading active notes...</p>
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
      <h2 className={styles.pageTitle}>Active Notes</h2>
      <div className={styles.actionsBar}>
        <Link to="/notes/new" className={styles.createNoteButton}>
          Create New Note
        </Link>
      </div>
      {notes.length === 0 ? (
        <p className={styles.noNotesMessage}>No active notes found. Why not create one?</p>
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
