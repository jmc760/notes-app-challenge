import { Link } from 'react-router-dom';
import { type NoteResponseDto } from '../../dto/NoteResponseDto';
import styles from './NoteCard.module.css';

interface Props {
  note: NoteResponseDto;
  onArchiveToggle: (id: number, currentStatus: boolean) => void;
  onDelete: (id: number) => void;
}

export const NoteCard = ({ note, onArchiveToggle, onDelete }: Props) => {
  return (
    <div className={styles.noteCard}>
      <h3 className={styles.noteTitle}>{note.title}</h3>
      <p className={styles.noteContent}>
        {note.content.length > 100 ? note.content.substring(0, 100) + '...' : note.content}
      </p>
      <div className={styles.noteMeta}>
        <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
        <span>Modified: {new Date(note.lastModifiedAt).toLocaleDateString()}</span>
      </div>
      <div className={styles.noteActions}>
        <Link to={`/notes/${note.id}`} className={styles.button + ' ' + styles.viewButton}>
          View/Edit
        </Link>
        <button
          className={styles.button + ' ' + (note.archived ? styles.unarchiveButton : styles.archiveButton)}
          onClick={() => onArchiveToggle(note.id, note.archived)}
        >
          {note.archived ? 'Unarchive' : 'Archive'}
        </button>
        <button
          className={styles.button + ' ' + styles.deleteButton}
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
