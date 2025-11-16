'use client';

import css from './GoodsOrderList.module.css';
import { useCartStore } from '@/lib/store/cartStore';
import { useQueries } from '@tanstack/react-query';
import { fetchGoodById } from '@/lib/api/clientApi';
import GoodsOrderListItem from './GoodsOrderListItem';

export default function GoodsOrderList() {
  const { items } = useCartStore();

  const queries = useQueries({
    queries: items.map(cartItem => ({
      queryKey: ['good', cartItem._id],
      queryFn: () => fetchGoodById(cartItem._id),
    })),
  });

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {items.map((cartItem, index) => {
          const query = queries[index];
          if (!query.data) return null;

          return (
            <GoodsOrderListItem
              key={`${cartItem._id}-${cartItem.size}`}
              cartItem={cartItem}
              item={query.data}
            />
          );
        })}
      </ul>
    </div>
  );
}
