'use client';

import css from './BasketModal.module.css';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import GoodsOrderList from '@/components/GoodsOrderList/GoodsOrderList';
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
// import { X } from 'lucide-react';
import Modal from '@/components/Modal/Modal';
import { useEffect } from 'react';
import { on } from 'events';

export default function BasketModal() {
  const router = useRouter();
  const { items, total } = useCartStore();

  const onClose = (route?: string) => {
    router.back();
    if (!route) return;
    setTimeout(() => {
      router.push(route);
    }, 50);
  };

  useEffect(() => {
    // Close modal on Escape key press
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);
  // Close modal on backdrop click
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal>
      <div
        className={`backdrop ${css.backdrop}`}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true">
        <div
          className={`modal ${css.modal}`}
          onClick={e => e.stopPropagation()}>
          <button className={css.closeBtn} onClick={() => router.back()}>
            {/* <X size={24} /> */}
            <svg className={css.closeIcon} height={24} width={24}>
              <use href="/sprite.svg#close"></use>
            </svg>
          </button>

          <h2 className={css.title}>Ваш кошик</h2>

          {items.length > 0 ? (
            <>
              <GoodsOrderList />

              {/* TOTAL */}
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

              {/* ACTIONS */}
              <div className={css.actions}>
                <button
                  className={`btn btn-secondary ${css.basketBtn}`}
                  onClick={() => onClose('/goods')}>
                  Продовжити покупки
                </button>

                <button
                  className={`btn btn-primary ${css.basketBtn}`}
                  onClick={() => onClose('/order')}>
                  Оформити замовлення
                </button>
              </div>
            </>
          ) : (
            <MessageNoInfo
              text="Ваш кошик порожній, мерщій до покупок!"
              buttonText="До покупок"
              onClick={() => onClose('/goods')}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}
