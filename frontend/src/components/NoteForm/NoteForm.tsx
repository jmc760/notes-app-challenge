import { useEffect, useState, type FormEvent } from 'react';
import { type NoteRequestDto } from '../../dto/NoteRequestDto';
import { type NoteResponseDto } from '../../dto/NoteResponseDto';
import styles from './NoteForm.module.css';

interface Props {
  initialNote?: NoteResponseDto;
  onSubmit: (note: NoteRequestDto) => void;
  onCancel: () => void;
}

export const NoteForm = ({ initialNote, onSubmit, onCancel }: Props) => {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setContent(initialNote.content);
    }
  }, [initialNote]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form className={styles.noteForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>Title:</label>
        <input
          type="text"
          id="title"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>Content:</label>
        <textarea
          id="content"
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
        ></textarea>
      </div>
      <div className={styles.formActions}>
        <button type="submit" className={styles.button + ' ' + styles.submitButton}>
          {initialNote ? 'Save changes' : 'Create Note'}
        </button>
        <button type="button" className={styles.button + ' ' + styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};