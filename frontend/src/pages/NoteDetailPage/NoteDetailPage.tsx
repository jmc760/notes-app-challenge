import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type NoteResponseDto } from '../../dto/NoteResponseDto';
import { type NoteRequestDto } from '../../dto/NoteRequestDto';
import {
  getNoteById,
  updateNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
} from '../../api/notesService';
import { NoteForm } from '../../components';
import styles from './NoteDetailPage.module.css';

export const NoteDetailPage = () => {

  // useParams hook to extract route parameters (like 'id')
  const { id } = useParams<{ id: string }>();
  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  const [note, setNote] = useState<NoteResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false); // State to toggle between view and edit mode

  // Function to fetch the note by ID
  const fetchNote = useCallback(async () => {
    if (!id) {
      setError('Note ID is missing.');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // Convert id string from URL to number
      const fetchedNote = await getNoteById(Number(id));
      if (fetchedNote) {
        setNote(fetchedNote);
      } else {
        setError('Note not found.');
      }
    } catch (err) {
      console.error(`Failed to fetch note with ID ${id}:`, err);
      setError('Failed to load note. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [id]); // Dependency array includes id, so it refetches if ID changes

  // useEffect hook to fetch the note when the component mounts or ID changes
  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  // Handler for updating the note
  const handleUpdate = async (noteData: NoteRequestDto) => {
    if (!id || !note) return; // Ensure ID and note exist

    setIsLoading(true);
    setError(null);
    try {
      const updatedNote = await updateNote(Number(id), noteData);
      if (updatedNote) {
        setNote(updatedNote); // Update the local state with the new note data
        setIsEditing(false); // Exit edit mode
      } else {
        setError('Note not found or could not be updated.');
      }
    } catch (err) {
      console.error(`Error updating note with ID ${id}:`, err);
      setError('Failed to update note. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for archiving/unarchiving the note
  const handleArchiveToggle = async () => {
    if (!id || !note) return;

    setIsLoading(true);
    setError(null);
    try {
      let updatedNote: NoteResponseDto | null;
      if (note.archived) {
        updatedNote = await unarchiveNote(Number(id));
      } else {
        updatedNote = await archiveNote(Number(id));
      }

      if (updatedNote) {
        setNote(updatedNote);
        // Optionally, navigate away if archiving/unarchiving means it leaves this view
        // For now, I'll just update the state and let the user see the change.
      } else {
        setError('Note not found or could not update archive status.');
      }
    } catch (err) {
      console.error(`Error toggling archive status for note ${id}:`, err);
      setError('Failed to update note status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for deleting the note
  const handleDelete = async () => {
    if (!id) return;

    if (!window.confirm('Are you sure you want to delete this note permanently?')) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const success = await deleteNote(Number(id));
      if (success) {
        console.log(`Note ${id} deleted successfully.`);
        navigate('/notes/active'); // Redirect to active notes page after deletion
      } else {
        setError('Note not found or could not be deleted.');
      }
    } catch (err) {
      console.error(`Error deleting note with ID ${id}:`, err);
      setError('Failed to delete note. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className={styles.container}>
        <p className={styles.loadingMessage}>Loading note details...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.errorMessage}>{error}</p>
        <button onClick={fetchNote} className={styles.retryButton}>Retry</button>
      </div>
    );
  }

  // Render "Note not found" state (if note is null after loading)
  if (!note) {
    return (
      <div className={styles.container}>
        <p className={styles.noNoteFoundMessage}>Note not found.</p>
        <button onClick={() => navigate('/notes/active')} className={styles.backButton}>Back to Active Notes</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>{isEditing ? 'Edit Note' : 'Note Details'}</h2>

      {isEditing ? (
        // Render NoteForm in edit mode
        <NoteForm
          initialNote={note} // Pre-fill form with current note data
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)} // Exit edit mode on cancel
        />
      ) : (
        // Render note details in view mode
        <div className={styles.noteDetails}>
          <h3 className={styles.noteDetailTitle}>{note.title}</h3>
          <p className={styles.noteDetailContent}>{note.content}</p>
          <div className={styles.noteMeta}>
            <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
            <span>Last Modified: {new Date(note.lastModifiedAt).toLocaleDateString()}</span>
            <span>Status: {note.archived ? 'Archived' : 'Active'}</span>
          </div>
          <div className={styles.actions}>
            <button onClick={() => setIsEditing(true)} className={styles.button + ' ' + styles.editButton}>
              Edit Note
            </button>
            <button
              onClick={handleArchiveToggle}
              className={styles.button + ' ' + (note.archived ? styles.unarchiveButton : styles.archiveButton)}
            >
              {note.archived ? 'Unarchive' : 'Archive'}
            </button>
            <button onClick={handleDelete} className={styles.button + ' ' + styles.deleteButton}>
              Delete Note
            </button>
            <button onClick={() => navigate('/notes/active')} className={styles.button + ' ' + styles.backButton}>
              Back to Notes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};