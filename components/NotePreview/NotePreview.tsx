
import css from './NotePreview.module.css';
import type { Note } from '@/types/note';

interface Props {
  note: Note;
  onBack: () => void;
}

export default function NotePreviewView({ note, onBack }: Props) {
  return (
    <div className={css.container}>
      <button className={css.backBtn} onClick={onBack}>
        ← Back
      </button>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}