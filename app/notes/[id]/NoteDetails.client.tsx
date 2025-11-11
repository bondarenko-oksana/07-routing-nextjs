

'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/Loader/Loader';
import css from '@/components/NotePreview/NotePreview.module.css';

export default function NoteDetailsClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <Loader />;
  if (isError || !data) return <p>Error loading note</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data.title}</h2>
          <span className={css.tag}>{data.tag}</span>
        </div>
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>{new Date(data.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}