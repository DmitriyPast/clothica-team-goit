'use client';
import { useState, useEffect } from 'react';
import PopularGoodsSwiper from './PopularGoodsSwiper';
import { Good } from '@/types/good';

export default function PopularGoods() {
  const [goods, setGoods] = useState<Good[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGoods() {
      try {
        const res = await fetch('/api/goods?page=1&perPage=20');
        const data = await res.json();
        setGoods(data.goods);
      } catch (err) {
        console.error('Помилка завантаження товарів', err);
      } finally {
        setLoading(false);
      }
    }

    loadGoods();
  }, []);

  if (loading) return <p>Завантаження товарів...</p>;
  if (!goods.length) return <p>Товари відсутні</p>;

  return <PopularGoodsSwiper goods={goods} />;
}
