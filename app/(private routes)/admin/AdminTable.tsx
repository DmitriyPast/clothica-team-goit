"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { create } from "zustand";
import css from "./AdminTable.module.css";

// Типи
type ApiStatus = "Pending" | "Processing" | "Completed" | "Cancelled";
type OrderStatus = "У процесі" | "Комплектується" | "Виконано" | "Скасовано";

interface Order {
  orderId: string;
  createdAt: string;
  total: number;
  status: OrderStatus;
  country?: string;
}

// Мапінг статусів
const statusMap: Record<ApiStatus, OrderStatus> = {
  Pending: "У процесі",
  Processing: "Комплектується",
  Completed: "Виконано",
  Cancelled: "Скасовано",
};

const reverseStatusMap: Record<OrderStatus, ApiStatus> = {
  "У процесі": "Pending",
  "Комплектується": "Processing",
  "Виконано": "Completed",
  "Скасовано": "Cancelled",
};

const API = process.env.NEXT_PUBLIC_API_BASE;

// Zustand Store
const useOrderStore = create<{
  orders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  fetchOrders: (page: number, perPage: number) => Promise<void>;
}>((set) => ({
  orders: [],
  updateOrderStatus: async (id, status) => {
    try {
      const apiStatus = reverseStatusMap[status];
      await fetch(`${API}/api/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: apiStatus }),
      });

      set((state) => ({
        orders: state.orders.map((o) =>
          o.orderId === id ? { ...o, status } : o
        ),
      }));
    } catch (err) {
      console.error("Помилка оновлення статусу:", err);
    }
  },
  fetchOrders: async (page, perPage) => {
    try {
      const res = await fetch(`${API}/api/orders?page=${page}&perPage=${perPage}`);
      const data = await res.json();

      const orders: Order[] = data.map((o: any) => ({
        orderId: o.orderNumber,
        createdAt: o.createdAt,
        total: o.totalPrice?.value ?? 0,
        status: statusMap[o.status as ApiStatus] ?? "У процесі",
        country: o.shippingAddress,
      }));

      set((state) => ({ orders: [...state.orders, ...orders] }));
    } catch (err) {
      console.error("Помилка завантаження замовлень:", err);
    }
  },
}));

// Компонент таблиці
export default function AdminTable() {
  const { orders, updateOrderStatus, fetchOrders } = useOrderStore();
  const [page, setPage] = useState(1);
  const perPage = 4;
  const router = useRouter();

  useEffect(() => {
    fetchOrders(page, perPage);
  }, [page, fetchOrders]);

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
