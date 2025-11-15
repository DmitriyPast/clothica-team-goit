'use client';
import css from './GoodsOrderList.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCartStore, CartItem } from '@/lib/store/cartStore';
import { Good } from '@/types/good';
import { fetchGoodById } from '@/lib/api/clientApi';

type GoodsWithId = Good & { quantity: number };

export default function GoodsOrderList() {
  const { items, total, removeItemFromCart, setQuantity } = useCartStore();
  const [goodsData, setGoodsData] = useState<GoodsWithId[]>([]);

  useEffect(() => {
    async function loadGoods() {
      const data = await Promise.all(
        items.map(async item => {
          const goodData = await fetchGoodById(item._id);
          return { ...goodData, quantity: item.quantity };
        })
      );
      setGoodsData(data);
    }

    loadGoods();
  }, [items]);

  // Форматування ціни
  const formatPrice = (value: number) => value.toLocaleString('uk-UA');

  // Середній рейтинг
  const getRating = (feedbacks?: Good['feedbacks']) => {
    if (!feedbacks || feedbacks.length === 0) return { avg: 0, count: 0 };
    const avg =
      feedbacks.reduce((sum, f) => sum + f.rate, 0) / feedbacks.length;
    return { avg: avg.toFixed(1), count: feedbacks.length };
  };

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {goodsData.map(item => {
          const { avg, count } = getRating(item.feedbacks);

          return (
            <li key={item._id} className={css.item}>
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
                        {count}
                      </span>
                    </div>
                  </div>
                  <p className={css.price}>
                    {item.price.value} {item.price.currency}
                  </p>
                </div>
                <div className={css.quantityBlock}>
                  <input
                    className={css.quantityInput}
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={e =>
                      setQuantity(item._id, Number(e.target.value))
                    }
                  />
                  <button
                    className={`btn ${css.deleteBtn}`}
                    onClick={() => removeItemFromCart(item._id)}>
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

      {/* Підсумок */}
      <ul className={css.totalBlock}>
        <li className={css.block}>
          <p className={css.text}>Проміжний підсумок</p>
          <p className={css.price}>
            {formatPrice(total.value)} {total.currency}
          </p>
        </li>
        <li className={css.block}>
          <p className={css.text}>Доставка</p>
          <p className={css.price}>Безкоштовно</p>
        </li>
        <li className={css.block}>
          <p className={css.strongText}>Всього:</p>
          <strong className={css.price}>
            {formatPrice(total.value)} {total.currency}
          </strong>
        </li>
      </ul>
    </div>
  );
}
