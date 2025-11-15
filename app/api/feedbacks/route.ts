import { NextResponse } from 'next/server';
// import { fetchFeedbacks } from '@/lib/api/serverApi';
import { api } from '../api';

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
