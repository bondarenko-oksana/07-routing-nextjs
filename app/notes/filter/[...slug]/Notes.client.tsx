'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../../../lib/api';
import type { FetchNotesParams, FetchNotesResponse } from '../../../../lib/api';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Pagination from '../../../../components/Pagination/Pagination';
import NoteList from '../../../../components/NoteList/NoteList';
import Modal from '../../../../components/Modal/Modal';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import Loader from '../../../../components/Loader/Loader';
import css from '../../../../components/NotesPage/NotesPage.module.css';

export const NOTES_QUERY_KEY = 'notes';


interface NotesClientProps {
  tag?: string; 
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const queryKey = [NOTES_QUERY_KEY, page, debouncedSearch, tag];

  const { data, isLoading, isError, isFetching } = useQuery<FetchNotesResponse, Error>({
    queryKey,
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        ...(tag ? { tag } : {}),
      } as FetchNotesParams),
    placeholderData: (prev) => prev,
  });

  const handleCreateSuccess = async () => {
    setIsModalOpen(false);
    setPage(1);
    await queryClient.invalidateQueries({ queryKey: [NOTES_QUERY_KEY] });
    toast.success('Note created');
  };

  const handleDeleteSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: [NOTES_QUERY_KEY] });
    toast.success('Note deleted');
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />
        )}
        <button className={css.createButton} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main className={css.main}>
        {isError && <div className={css.error}>Failed to load notes.</div>}
        {(isLoading || !data) && <Loader />}
        {data?.notes && data.notes.length > 0 && (
          <>
            <NoteList notes={data.notes} onDeleteSuccess={handleDeleteSuccess} />
            {isFetching && <Loader small className={css.loaderAbovePagination} />}
          </>
        )}
        {data?.notes && data.notes.length === 0 && <div className={css.empty}>No notes found.</div>}
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} onSuccess={handleCreateSuccess} />
        </Modal>
      )}
    </div>
  );
}

