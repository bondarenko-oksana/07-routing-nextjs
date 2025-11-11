import NotePreviewClient from './NotePreview.client';

export default function ModalNotePage({ params }: { params: { id: string } }) {
  return <NotePreviewClient id={params.id} />;
}