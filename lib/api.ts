import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note, NoteTag } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: TOKEN ? `Bearer ${TOKEN}` : '',
    'Content-Type': 'application/json',
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string; 
}

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params = new URLSearchParams();
  params.append('page', String(page));
  params.append('perPage', String(perPage));
  if (search) params.append('search', search);
 
  if (tag && tag !== 'all') params.append('tag', tag);
  const { data }: AxiosResponse<FetchNotesResponse> = await api.get(`/notes?${params.toString()}`);
  return data;
}

export async function createNote(payload: { title: string; content?: string; tag: NoteTag }): Promise<Note> {
  const { data }: AxiosResponse<Note> = await api.post('/notes', payload);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data }: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data }: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return data;
}