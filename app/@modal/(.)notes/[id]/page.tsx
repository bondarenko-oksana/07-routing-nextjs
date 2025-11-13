
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import NotePreviewClient from './NotePreview.client';
import { fetchNoteById } from '@/lib/api';

interface ModalNotePageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function ModalNotePage(props: ModalNotePageProps) {

  const resolvedParams = await props.params;
  const id = resolvedParams.id;

  const queryClient = new QueryClient();
  const queryKey = ['note', id];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}