// import type { Note, NoteTag } from '@/types/note';
// import type { User } from '@/types/user';
// import internalApi from './api';
// import { cookies } from 'next/headers';

// export interface FetchNotesResponse {
//   notes: Note[];
//   totalPages: number;
//   totalItems: number;
// }

// export interface FetchNoteParams {
//   page?: number;
//   perPage?: number;
//   search?: string;
//   tag?: NoteTag;
// }

// export const checkServerSession = async () => {
//   const cookieStore = await cookies();
//   const res = await internalApi.get('/auth/session', {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });
//   return res;
// };

// export const getServerMe = async (): Promise<User> => {
//   const cookieStore = await cookies();
//   const { data } = await internalApi.get('/users/me', {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });
//   return data;
// };

// // GET notes
// export async function fetchNotes(
//   params: FetchNoteParams
// ): Promise<FetchNotesResponse> {
//   const cookieStore = await cookies();
//   const { data } = await internalApi.get<FetchNotesResponse>('/notes', {
//     params,
//     headers: { Cookie: cookieStore.toString() },
//   });
//   return data;
// }

// // GET note by id
// export async function fetchNoteById(noteId: string): Promise<Note> {
//   const cookieStore = await cookies();
//   const { data } = await internalApi.get<Note>(`/notes/${noteId}`, {
//     headers: { Cookie: cookieStore.toString() },
//   });
//   return data;
// }
