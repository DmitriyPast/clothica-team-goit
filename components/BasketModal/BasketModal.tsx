'use client';

import css from './BasketModal.module.css';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import GoodsOrderList from '../GoodsOrderList/GoodsOrderList';
import MessageNoInfo from '../MessageNoInfo/MessageNoInfo';
import { X } from 'lucide-react';

export default function BasketModal() {
  const router = useRouter();
  const { items, total } = useCartStore();

  // Закриття по Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [router]);

  // Закриття по кліку на бекдроп
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) router.back();
  };

  return (
    <div className={`backdrop ${css.backDrop}`} onClick={handleBackdropClick}>
      <div className={` modal  ${css.modal}`}>
        <button className={css.closeBtn} onClick={() => router.back()}>
          <X size={24} />
        </button>

        <h2 className={css.title}>Ваш кошик</h2>

        {items.length > 0 ? (
          <>
            <GoodsOrderList />
            <ul className={css.totalBlock}>
              <li className={css.block}>
                <p className={css.text}>Проміжний підсумок</p>
                <p className={css.price}>
                  {total.value} {total.currency}
                </p>
              </li>
              <li className={css.block}>
                <p className={css.text}>Доставка</p>
                <p className={css.price}>Безкоштовно</p>
              </li>
              <li className={css.block}>
                <p className={css.strongText}>Всього:</p>
                <strong className={css.price}>
                  {total.value} {total.currency}
                </strong>
              </li>
            </ul>

            <div className={css.actions}>
              <button
                className={`btn btn-secondary ${css.basketBtn}`}
                onClick={() => router.push('/goods')}
              >
                Продовжити покупки
              </button>
              <button
                className={`btn btn-primary ${css.basketBtn}`}
                onClick={() => router.push('/order')}
              >
                Оформити замовлення
              </button>
            </div>
          </>
        ) : (
          <MessageNoInfo
            text="Ваш кошик порожній, мерщій до покупок!"
            buttonText="До покупок"
            onClick={() => router.push('/goods')}
          />
        )}
      </div>
    </div>
  );
}
