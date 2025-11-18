'use client';
import GoodsOrderList from '@/components/GoodsOrderList/GoodsOrderList';
import css from './CreateOrder.module.css';
import { useCartStore } from '@/lib/store/cartStore';
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
import { useRouter } from 'next/navigation';
import CreateOrderForm from '@/components/CreateOrderForm/CreateOrderForm';

export default function OrderPage() {
  const { items } = useCartStore();
  const router = useRouter();
  return (
    <section>
      <div className="container">
        <h2 className={css.headTitle}>Оформити замовлення</h2>
        <div className={css.wrapper}>
          <div className={css.goodsBlock}>
            
            {items.length > 0 ? (
              <div className={css.goods}>
                <h3 className={css.title}>Товари</h3>
                <GoodsOrderList />
              </div>
            ) : (
              <MessageNoInfo
                text="Ваш кошик порожній, мерщій до покупок!"
                buttonText="До покупок"
                onClick={() => router.push('/goods')}
              />
            )}
          </div>
          <div className={css.form}>
            <h3 className={css.title}>Особиста інформація</h3>
            <CreateOrderForm />
          </div>
        </div>
      </div>
    </section>
  );
}
