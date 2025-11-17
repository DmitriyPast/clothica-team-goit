import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CURRENCIES } from '@/constants/currency';

export interface CartItem {
  _id: string; // унікальний id товару
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}

type CartState = {
  items: CartItem[];
  total: { value: number; currency: (typeof CURRENCIES)[number] };
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (_id: string, size: string) => void;
  setQuantity: (_id: string, size: string, q: number) => void;
  clearCart: () => void;
};

const calculateTotal = (
  items: CartItem[],
  currency: (typeof CURRENCIES)[number] = 'грн'
) => ({
  value: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  currency,
});

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: { value: 0, currency: 'грн' },

      addItem: (item, quantity = 1) => {
        set(state => {
          const items = [...state.items];
          // унікальність по _id + size
          const idx = items.findIndex(
            i => i._id === item._id && i.size === item.size
          );

          if (idx >= 0) {
            items[idx] = {
              ...items[idx],
              quantity: items[idx].quantity + quantity,
            };
          } else {
            items.push({ ...item, quantity });
          }

          return { items, total: calculateTotal(items) };
        });
      },

      removeItem: (_id, size) => {
        const items = get().items.filter(
          i => !(i._id === _id && i.size === size)
        );
        set({ items, total: calculateTotal(items) });
      },

      setQuantity: (_id, size, quantity) => {
        if (!Number.isFinite(quantity) || quantity <= 0) return; // ❗ блок невалідних значень

        const items = get().items.map(i =>
          i._id === _id && i.size === size ? { ...i, quantity } : i
        );

        set({ items, total: calculateTotal(items) });
      },

      clearCart: () => set({ items: [], total: { value: 0, currency: 'грн' } }),
    }),
    { name: 'clothica-cart-storage' }
  )
);
