import { NextResponse } from 'next/server';
import { api } from '../api';
import { logErrorResponse } from '../_utils/utils';
import { isAxiosError } from 'axios';

export async function GET(request: Request) {
  try {
    const res = await api(`/goods`, {
      params: { page:1, perPage: 5 },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
