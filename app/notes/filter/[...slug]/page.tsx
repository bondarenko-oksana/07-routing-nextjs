
import { use } from 'react';
import NotesClient from './Notes.client';

export default function FilteredNotesPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = use(params);
  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];
  return <NotesClient tag={tag} />;
}