
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient, { NOTES_QUERY_KEY } from './Notes.client';

interface FilteredNotesPageProps {
  params: { slug?: string[] } | Promise<{ slug?: string[] }>;
}

export default async function FilteredNotesPage(props: FilteredNotesPageProps) {
 
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;
  const tag: string | undefined = slug?.[0] === 'all' ? undefined : slug?.[0];

  const page = 1;
  const search = '';
  const queryKey = [NOTES_QUERY_KEY, page, search, tag];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search,
        ...(tag ? { tag } : {}),
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}