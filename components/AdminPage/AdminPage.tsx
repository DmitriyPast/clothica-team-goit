"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";

// 🧠 Типи
type OrderStatus = "У процесі" | "Комплектується" | "Виконано" | "Скасовано";

interface Order {
  orderId: string;
  createdAt: string;
  total: number;
  status: OrderStatus;
  country?: string; // 👈 додаємо для фільтрації
}

// 🧠 Zustand Store
interface OrderStore {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  fetchOrders: (page: number, perPage: number) => Promise<void>;
}

const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.orderId === orderId ? { ...order, status } : order
      ),
    })),
  fetchOrders: async (page, perPage) => {
    try {
      const res = await fetch(`/api/orders?page=${page}&perPage=${perPage}`);
      const data = await res.json();

      const mapped = data.map((order: any) => ({
        orderId: order.orderNumber,
        createdAt: order.createdAt,
        total: order.totalPrice?.value ?? 0,
        status: mapStatus(order.status),
      }));

      set((state) => ({
        orders: [...state.orders, ...mapped],
      }));
    } catch (err) {
      console.error("Помилка завантаження замовлень:", err);
    }
  },
}));


function mapStatus(apiStatus: string): OrderStatus {
  switch (apiStatus) {
    case "Pending":
      return "У процесі";
    case "Processing":
      return "Комплектується";
    case "Completed":
      return "Виконано";
    case "Cancelled":
      return "Скасовано";
    default:
      return "У процесі";
  }
}

// 👨‍💼 Компонент таблиці з кнопками
function AdminTable() {
  const orders = useOrderStore((state) => state.orders);
  const updateStatus = useOrderStore((state) => state.updateOrderStatus);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);
  const [page, setPage] = useState(1);
  const perPage = 4;

  useEffect(() => {
    fetchOrders(page, perPage);
  }, [page]);

  const handleLoadMore = () => setPage((prev) => prev + 1);
  const handleLogout = () => {
    alert("Ви вийшли з кабінету адміністратора");
    // router.push("/login") або window.location.href = "/"
  };

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Дата / №</th>
            <th>Сума</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>
                {new Date(order.createdAt).toLocaleString("uk-UA", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
                <br />
                №{order.orderId}
              </td>
              <td>{order.total.toFixed(2)} грн</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order.orderId, e.target.value as OrderStatus)
                  }
                >
                  <option value="У процесі">У процесі</option>
                  <option value="Комплектується">Комплектується</option>
                  <option value="Виконано">Виконано</option>
                  <option value="Скасовано">Скасовано</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <button onClick={handleLoadMore}>▼ Показати ще</button>
      </div>

      <div style={{ textAlign: "center", marginTop: 32 }}>
        <button onClick={handleLogout}>🚪 Вийти з кабінету</button>
      </div>
    </section>
  );
}

// 🧪 Сторінка
export default function AdminCabinetPage() {
  return (
    <main>
      <h1>Кабінет адміністратора</h1>
      <AdminTable />
    </main>
  );
}
