'use client';

import css from './GoodsOrderList.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useCartStore } from '@/lib/store/cartStore';
import { Feedback } from '@/types/feedback';

export default function GoodsOrderListItem({ cartItem, item }: any) {
  const { removeItem, setQuantity } = useCartStore();

  const feedbacks: Feedback[] = item.feedbacks ?? [];
  const avg =
    feedbacks.length === 0
      ? 0
      : (feedbacks.reduce((s, x) => s + x.rate, 0) / feedbacks.length).toFixed(
          1
        );

  // локальний input state
  const [localValue, setLocalValue] = useState(String(cartItem.quantity));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (val === '') {
      setLocalValue('');
      return;
    }

    if (!/^\d+$/.test(val)) return;

    const num = Number(val);
    if (num <= 0) {
      setLocalValue(val);
      return;
    }

    setLocalValue(val);
    setQuantity(cartItem._id, cartItem.size, num);
  };

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
                {avg ? (
                  <svg width={16} height={16}>
                    <use href="/sprite.svg#star-filled" />
                  </svg>
                ) : (
                  <svg width={16} height={16}>
                    <use href="/sprite.svg#star" />
                  </svg>
                )}
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
        </div>
        <div className={css.sizePriceBlock}>
          <p className={css.text}>Розмір: {cartItem.size}</p>
          <p className={css.price}>
            {(item.price.value).toLocaleString()} {item.price.currency}
          </p>
        </div>

        <div className={css.quantityBlock}>
          <input
            className={css.quantityInput}
            type="number"
            min={1}
            value={localValue}
            onChange={onChange}
            onBlur={() => {
              if (localValue === '') {
                setLocalValue(String(cartItem.quantity));
              }
            }}
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
}
