import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation
import { NoteForm } from '../../components';
import { createNote } from '../../api/notesService';
import { type NoteRequestDto } from '../../dto/NoteRequestDto';
import styles from './CreateNotePage.module.css';

export const CreateNotePage = () => {

  const navigate = useNavigate(); // Initialize the navigate hook
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the form submission to create a new note.
   * @param noteData The note data (title and content) from the form.
   */
  const handleSubmit = async (noteData: NoteRequestDto) => {
    setIsLoading(true);
    setError(null); // Clear any previous errors
    try {
      // Call the API service to create the note
      const newNote = await createNote(noteData);
      console.log('Note created successfully:', newNote);
      // Redirect to the active notes page or the detail page of the new note
      navigate('/notes/active');
    } catch (err) {
      console.error('Error creating note:', err);
      setError('Failed to create note. Please check your input and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the cancel action, navigating back to the active notes page.
   */
  const handleCancel = () => {
    navigate('/notes/active'); // Navigate back to the active notes list
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Create New Note ✍️</h2>
      {isLoading && <p className={styles.loadingMessage}>Creating note...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      <NoteForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};