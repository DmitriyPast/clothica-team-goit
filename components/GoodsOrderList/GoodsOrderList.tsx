'use client';

import css from './GoodsOrderList.module.css';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cartStore';
import { useQueries } from '@tanstack/react-query';
import { fetchGoodById } from '@/lib/api/clientApi';

export default function GoodsOrderList() {
  const { items, removeItem, setQuantity } = useCartStore();

  // Масив запитів для всіх товарів у кошику
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
          const item = query.data;

          if (!item) return null;

          const feedbacks = item.feedbacks ?? [];
          const avg =
            feedbacks.length === 0
              ? 0
              : (
                  feedbacks.reduce((s, x) => s + x.rate, 0) / feedbacks.length
                ).toFixed(1);

          return (
            <li key={`${item._id}-${cartItem.size}`} className={css.item}>
              <Image
                className={css.img}
                src={item.image}
                alt={item.name}
                width={82}
                height={101}
              />
              <div className={css.info}>
                <div className={css.nameBlock}>
                  <div>
                    <h3 className={css.title}>{item.name}</h3>
                    <div className={css.ratingBlock}>
                      <div className={css.rating}>
                        <svg width={16} height={16}>
                          <use href="/sprite.svg#star-filled" />
                        </svg>
                        <span>{avg}</span>
                      </div>
                      <span className={css.rating}>
                        <svg width={16} height={16}>
                          <use href="/sprite.svg#comment" />
                        </svg>
                        {feedbacks.length}
                      </span>
                    </div>
                  </div>
                  {/* <p className={css.text}>Розмір: {cartItem.size}</p> */}
                  <p className={css.price}>
                    {item.price.value} {item.price.currency}
                  </p>
                </div>
                <div className={css.quantityBlock}>
                  <input
                    className={css.quantityInput}
                    type="number"
                    min={1}
                    value={cartItem.quantity}
                    onChange={e =>
                      setQuantity(
                        item._id,
                        cartItem.size,
                        Number(e.target.value)
                      )
                    }
                  />
                  <button
                    className={`btn ${css.deleteBtn}`}
                    onClick={() => removeItem(item._id, cartItem.size)}>
                    <svg width={24} height={24}>
                      <use href="/sprite.svg#delete" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
