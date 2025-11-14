'use client';

import css from './BasketModal.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import GoodsOrderList from '@/components/GoodsOrderList/GoodsOrderList';
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
import { X } from 'lucide-react';

export default function BasketModal() {
  const router = useRouter();
  const { items } = useCartStore();

  // Закриття по Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [router]);

  // Блокування скролу фону
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const closeModal = (route?: string) => {
    document.body.style.overflow = 'auto';
    router.back();
    if (route) {
      setTimeout(() => {
        router.push(route);
      }, 50); // невелика затримка
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) router.back();
  };

  return (
    <div className={`backdrop ${css.backDrop}`} onClick={handleBackdropClick}>
      <div className={`modal ${css.modal}`}>
        <button
          className={css.closeBtn}
          onClick={() => closeModal()}
          aria-label="Close">
          <X size={24} />
        </button>

        <h2 className={css.title}>Ваш кошик</h2>

        {items.length > 0 ? (
          <>
            <GoodsOrderList />
            <div className={css.actions}>
              <button
                className={`btn btn-secondary ${css.basketBtn}`}
                onClick={e => {
                  e.stopPropagation();
                  closeModal('/goods');
                }}>
                Продовжити покупки
              </button>
              <button
                className={`btn btn-primary ${css.basketBtn}`}
                onClick={() => {
                  closeModal('/order');
                }}>
                Оформити замовлення
              </button>
            </div>
          </>
        ) : (
          <MessageNoInfo
            text="Ваш кошик порожній, мерщій до покупок!"
            buttonText="До покупок"
            onClick={() => closeModal('/goods')}
          />
        )}
      </div>
    </div>
  );
}
