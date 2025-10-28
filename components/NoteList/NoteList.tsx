
import Link from 'next/link';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '@/types/note';
import { deleteNote } from '@/lib/api';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  onDeleteSuccess?: () => void;
}

export default function NoteList({ notes, onDeleteSuccess }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: deleteNote,
    onMutate: (id) => setDeletingId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onDeleteSuccess?.();
    },
    onSettled: () => setDeletingId(null),
  });

  if (!notes || notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map((n) => (
        <li key={n.id} className={css.listItem}>
          <h2 className={css.title}>{n.title}</h2>
          <p className={css.content}>{n.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{n.tag}</span>
            <div className={css.actions}>
              <Link href={`/notes/${n.id}`} className={css.link}>
                View details
              </Link>
              <button
                className={css.button}
                onClick={() => mutation.mutate(n.id)}
                disabled={mutation.isPending && deletingId === n.id}
              >
                {mutation.isPending && deletingId === n.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}