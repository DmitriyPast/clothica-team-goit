import { NextResponse } from 'next/server';
// import { fetchFeedbacks } from '@/lib/api/serverApi';
import { api } from '../api';
import { AxiosError } from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId') || '';
  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 10;

  // try {
  //   const data = await fetchFeedbacks({ productId, page, perPage });
  //   return NextResponse.json(data);
  // } catch (error) {
  //   console.error("Помилка при отриманні відгуків:", error);
  //   return NextResponse.json(
  //     { message: "Не вдалося отримати відгуки" },
  //     { status: 500 }
  //   );
  // }

  try {
    const data = (await api.get('/feedbacks')).data;
    // console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Помилка при отриманні відгуків:', error);
    return NextResponse.json(
      { message: 'Не вдалося отримати відгуки' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await api.post('/feedbacks', body);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Помилка API' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { message: 'Не вдалося отримати відгуки' },
      { status: 500 }
    );
  }
}
