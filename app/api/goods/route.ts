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
    const size = request.nextUrl.searchParams.getAll('size') ?? '';
    const gender = request.nextUrl.searchParams.get('gender') ?? '';
    const minPrice = request.nextUrl.searchParams.get('minPrice') ?? '';
    const maxPrice = request.nextUrl.searchParams.get('maxPrice') ?? '';

    const params = new URLSearchParams();
    for (let i = 0; i < size.length; i++) {
      //had to loop in over the array otherwise it sends only one size
      params.append('size', size[i]);
    }

    // params.append('size', size[0]);
    // params.append('size', size[1]);
    // params.append('size', size[2]);
    // params.append('size', size[3]);
    // params.append('size', size[4]);
    // console.log('params: ' + params);
    const p = {
      page,
      perPage,
      ...(category !== 'all' && category !== '' && { category }),
      ...{ ...params },
      ...(gender && { gender }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
    };
    // console.log(p);

    const res = await api.get(`/goods?${params}`, {
      params: p,
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    // console.log(res);

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
