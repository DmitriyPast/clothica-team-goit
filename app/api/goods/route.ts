import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../_utils/utils';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const perPage = Number(request.nextUrl.searchParams.get('perPage') ?? 8);
    const category = request.nextUrl.searchParams.get('category') ?? '';
    const size = request.nextUrl.searchParams.get('size') ?? '';
    const gender = request.nextUrl.searchParams.get('gender') ?? '';
    const minPrice = request.nextUrl.searchParams.get('minPrice') ?? '';
    const maxPrice = request.nextUrl.searchParams.get('maxPrice') ?? '';

    const res = await api('/goods', {
      params: {
        page,
        perPage,
        ...(category !== 'all' && category !== '' && { category }),
        ...(size && { size }),
        ...(gender && { gender }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
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
