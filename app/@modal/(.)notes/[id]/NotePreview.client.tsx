
'use client';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import NotePreviewView from '@/components/NotePreview/NotePreview';
import Loader from '@/components/Loader/Loader';

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
       refetchOnMount: false,
  });

  const handleClose = () => router.back();

  if (isLoading) return <Loader />;
  if (isError || !data) return null;

  return (
    <Modal onClose={handleClose}>
      <NotePreviewView note={data} onBack={handleClose} />
    </Modal>
  );
}