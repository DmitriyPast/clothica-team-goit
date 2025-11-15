import { NextResponse } from 'next/server';
import axios from 'axios';
import {api} from '../api'

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || '1';
  const perPage = url.searchParams.get('perPage') || '5';

  try {
    const res = await axios.get('http://localhost:3030/api/categories', {
      params: { page, perPage },
    });

    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
