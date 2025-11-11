import css from './LayoutNotes.module.css';

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={css.container}>
      <main className={css.notesWrapper}>{children}</main>
    </div>
  );
}