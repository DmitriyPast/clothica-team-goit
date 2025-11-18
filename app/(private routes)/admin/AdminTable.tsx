"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { create } from "zustand";
import css from "./AdminTable.module.css";


/* Типи статусів з API */
type ApiStatus = "Pending" | "Processing" | "Completed" | "Cancelled";

/* Локальні статуси (те, що бачить адмін) */
type OrderStatus = "У процесі" | "Комплектується" | "Виконано" | "Скасовано";

/* Тип одного замовлення */
interface Order {
  orderId: string;
  createdAt: string;
  total: number;
  status: OrderStatus;
  country?: string;
}

/* Відповідність API-статусів українським */
const statusMap: Record<ApiStatus, OrderStatus> = {
  Pending: "У процесі",
  Processing: "Комплектується",
  Completed: "Виконано",
  Cancelled: "Скасовано",
};

/* Зворотна відповідність для відправки на API */
const reverseStatusMap: Record<OrderStatus, ApiStatus> = {
  "У процесі": "Pending",
  "Комплектується": "Processing",
  "Виконано": "Completed",
  "Скасовано": "Cancelled",
};

const API = process.env.NEXT_PUBLIC_API_BASE;

/* Zustand Store: зберігає замовлення та методи роботи з ними */
const useOrderStore = create<{
  orders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  fetchOrders: (page: number, perPage: number) => Promise<void>;
}>((set) => ({
  orders: [],

  /* Оновлення статусу поточного замовлення */
  updateOrderStatus: async (id, status) => {
    try {
      const apiStatus = reverseStatusMap[status];

      /* PATCH-запит на бекенд */
      await fetch(`${API}/api/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: apiStatus }),
      });

      /* Оновлення стану в Zustand */
      set((state) => ({
        orders: state.orders.map((o) =>
          o.orderId === id ? { ...o, status } : o
        ),
      }));
    } catch (err) {
      console.error("Помилка оновлення статусу:", err);
    }
  },

  /* Завантаження списку замовлень (посторінково) */
  fetchOrders: async (page, perPage) => {
    try {
      const res = await fetch(`${API}/api/orders?page=${page}&perPage=${perPage}`);
      const data = await res.json();

      /* Нормалізація структури отриманих даних */
      const orders: Order[] = data.map((o: any) => ({
        orderId: o.orderNumber,
        createdAt: o.createdAt,
        total: o.totalPrice?.value ?? 0,
        status: statusMap[o.status as ApiStatus] ?? "У процесі",
        country: o.shippingAddress,
      }));

      /* Додавання нових замовлень до існуючих */
      set((state) => ({ orders: [...state.orders, ...orders] }));
    } catch (err) {
      console.error("Помилка завантаження замовлень:", err);
    }
  },
}));

/* Основний компонент адмін-таблиці */
export default function AdminTable() {
  const { orders, updateOrderStatus, fetchOrders } = useOrderStore();

  const [page, setPage] = useState(1); // Поточна сторінка
  const perPage = 4;                   // Кількість замовлень на сторінку
  const router = useRouter();

  /* Завантаження замовлень при зміні сторінки */
  useEffect(() => {
    fetchOrders(page, perPage);
  }, [page, fetchOrders]);

  /* Вихід із кабінету */
  const handleExit = () => {
    router.push("/profile");
  };

  return (
    <section className={css.section}>
      <table className={css.table}>
        <thead>
          <tr>
            <th>Дата / №</th>
            <th>Сума</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(({ orderId, createdAt, total, status }) => (
            <tr key={orderId}>
              <td>
                {new Date(createdAt).toLocaleString("uk-UA", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
                <br />
                №{orderId}
              </td>
              <td>{total.toFixed(2)} грн</td>
              <td>
                <select
                  className={css.select}
                  value={status}
                  onChange={(e) =>
                    updateOrderStatus(orderId, e.target.value as OrderStatus)
                  }
                >
                  {Object.keys(reverseStatusMap).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={css.actions}>
        <button className={css.loadMoreBtn} onClick={() => setPage((p) => p + 1)}>
          ▼ Показати ще
        </button>
      </div>

      <div className={css.logout}>
        <button className={css.button} onClick={handleExit}>
          Вийти з кабінету
        </button>
      </div>
    </section>
  );
}
