import type { Note, CreateNote, NoteTag } from '@/types/note';
import internalApi from './api';
import type { User, RegisterUser } from '@/types/user';

export interface FetchNotesResponse {
  totalPages: number;
  notes: Note[];
}

 export interface FetchNoteParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: NoteTag;
}

//GET notes

export async function fetchNotes(
  params: FetchNoteParams
): Promise<FetchNotesResponse> {
  const { data } = await internalApi.get<FetchNotesResponse>('notes', { params });
  return data;
}

//GET note by id

export async function fetchNoteById(noteId: string): Promise<Note> {
  const { data } = await internalApi.get<Note>(`notes/${noteId}`);
  return data;
}

//POST create note

export async function createNote(note: CreateNote): Promise<Note> {
  const { data } = await internalApi.post<Note>('notes', note);
  return data;
}

// DELETE note

export async function deleteNote(noteId: string): Promise<{ id: string }> {
  const { data } = await internalApi.delete<{ id: string }>(`notes/${noteId}`);
  return data;
}

//register user

export async function registerUser(data: RegisterUser): Promise<User | null> {
  try {
    const response = await internalApi.post<User>('/auth/register', data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
}

// Login user

export async function loginUser(data: RegisterUser): Promise<User> {
  try {
    const {data : responseData} = await internalApi.post<User>('/auth/login', data, {
      withCredentials: true,
    });
    return responseData;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Logout user

export async function logoutUser(): Promise<void> {
  await internalApi.post('/auth/logout');
}

// Check user session

type CheckSessionResponse = {
  success: boolean;
};

export async function checkSession(): Promise<boolean> {
  const { data } = await internalApi.get<CheckSessionResponse>('/auth/session');
  return data.success;
}

// get current user

export async function getMe(): Promise<User | null> {
  try {
    const { data } = await internalApi.get<User>('/users/me');
    return data;
  } catch (error) {
    console.error('Get me error:', error);
    return null;
  }
}

// update user

export type UpdateUserRequest = {
  username?: string;
  email?: string;
  avatar?: string;
};

export async function updateMe(data: UpdateUserRequest): Promise<User> {
  try {
    const { data: requestData } = await internalApi.patch<User>('/users/me', data);
    return requestData;
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
}
