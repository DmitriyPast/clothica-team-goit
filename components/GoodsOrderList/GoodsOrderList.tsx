'use client';

import css from './GoodsOrderList.module.css';
import { useCartStore } from '@/lib/store/cartStore';
import { useQueries } from '@tanstack/react-query';
import { fetchGoodById } from '@/lib/api/clientApi';
import GoodsOrderListItem from './GoodsOrderListItem';

export default function GoodsOrderList() {
  const { items, total } = useCartStore();

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
      {/* TOTAL */}
      <ul className={css.totalBlock}>
        <li className={css.block}>
          <p className={css.text}>Проміжний підсумок</p>
          <p className={css.price}>
            {(total.value).toLocaleString()} {total.currency}
          </p>
        </li>
        <li className={css.block}>
          <p className={css.text}>Доставка</p>
          <p className={css.price}>Безкоштовно</p>
        </li>
        <li className={css.block}>
          <p className={css.strongText}>Всього:</p>
          <strong className={css.price}>
            {(total.value).toLocaleString()} {total.currency}
          </strong>
        </li>
      </ul>
    </div>
  );
}
