'use client';
import css from './ProfilePage.module.css';
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
import { useRouter } from 'next/navigation';
import UserInfoForm from '@/components/UserInfoForm/UserInfoForm';
import { useEffect, useState } from 'react';
import {
  fetchAllOrders,
  logoutUser,
  updateOrderStatus,
} from '@/lib/api/clientApi';
import showToast, { ToastType } from '@/lib/utils/messageService';
import { FetchOrdersResponse } from '@/lib/api/clientApi';
import { Order } from '@/types/order';
import { useAuthStore } from '@/lib/store/authStore';
import { ORDER_STATUSES } from '@/constants/order_status';

const ORDER_STATUS_TRANSLATIONS: Record<string, string> = {
  Pending: 'Очікується',
  Processing: 'Обробляється',
  Shipped: 'Відправлено',
  Delivered: 'Доставлено',
  Cancelled: 'Скасовано',
};
function translateOrderStatus(status: string): string {
  return ORDER_STATUS_TRANSLATIONS[status ?? ''] || status;
}

export default function OrderPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const data: FetchOrdersResponse = await fetchAllOrders();
        setOrders(data.orders);
      } catch (error) {
        showToast(ToastType.error, 'Помилка при завантаженні замовлень.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleClick = async () => {
    await logoutUser();
    router.push('/auth/login');
  };

  return (
    <section>
      <div className="container">
        <h2 className={css.headTitle}>Кабінет</h2>
        <div className={css.wrapper}>
          <div className={css.form}>
            <h3 className={css.title}>Особиста інформація</h3>
            <UserInfoForm />
          </div>
          {orders.length > 0 ? (
            <div className={css.ordersList}>
              <h3 className={css.titleH3}>Мої транзакції</h3>
              <ul className={css.orders}>
                {orders.map(order => (
                  <li key={order._id} className={css.orderItem}>
                    <div className={css.orderInfo}>
                      <p className={css.orderDate}>
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : 'Out Date'}
                      </p>
                      <p className={css.orderId}>№-{order._id?.slice(-8)}</p>
                    </div>
                    <div className={css.orderInfo}>
                      <p className={css.orderTotal}>Сума:</p>
                      <p>
                        {order.totalPrice.value} {order.totalPrice.currency}
                      </p>
                    </div>

                    {user?.role === 'Admin' ? (
                      <select name="status"
                        defaultValue={order.status}
                            onChange={async e => {
                              try {
                                const newStatus = e.target.value as (typeof ORDER_STATUSES)[number];
                                await updateOrderStatus(order._id!, { status: newStatus });
                                setOrders(prevOrders =>
                                  prevOrders.map(o =>
                                    o._id === order._id
                                      ? { ...o, status: newStatus }
                                      : o
                                  )
                                );
                                showToast(
                                  ToastType.success,
                                  'Статус замовлення оновлено успішно.'
                                );
                              } catch (error) {
                                showToast(
                                  ToastType.error,
                                  'Помилка при оновленні статусу замовлення.'
                                );
                              }
                          }}>
                        {ORDER_STATUSES.map(status => (
                          <option
                            key={status}
                            value={status}
                          >
                            {translateOrderStatus(status)}
                          </option>
                        ))}

                      </select>
                    ) : (
                      <div className={css.orderInfo}>
                        <p className={css.orderTotal}>Статус:</p>
                        <p>{translateOrderStatus(order.status)}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <MessageNoInfo
              text="У вас ще не було жодних замовлень! Мерщій до покупок!"
              buttonText="До покупок"
              onClick={() => router.push('/goods')}
            />
          )}
        </div>
        <button
          className={`btn btn-secondary ${css.button}`}
          onClick={handleClick}>
          Вийти з кабінету
        </button>
      </div>
    </section>
  );
}
