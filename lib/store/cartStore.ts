import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Good } from '@/types/good';
import { CURRENCIES } from '@/constants/currency';

export type CartItem = Good & { quantity: number };

type CartState = {
  items: CartItem[];
  total: { value: number; currency: (typeof CURRENCIES)[number] };
  addItem: (item: Good, quantity?: number) => void;
  removeItemFromCart: (_id: string) => void;
  setQuantity: (_id: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: { value: 0, currency: 'грн' },

      addItem: (item, quantity = 1) => {
        if (quantity < 1) return;

        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(i => i._id === item._id);

        let items: CartItem[];
        if (existingIndex !== -1) {
          items = currentItems.map((i, idx) =>
            idx === existingIndex
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        } else {
          items = [...currentItems, { ...item, quantity }];
        }

        const totalValue = items.reduce(
          (sum, i) => sum + i.price.value * i.quantity,
          0
        );

        set({ items, total: { value: totalValue, currency: 'грн' } });
      },

      removeItemFromCart: _id => {
        const items = get().items.filter(i => i._id !== _id);
        const totalValue = items.reduce(
          (sum, i) => sum + i.price.value * i.quantity,
          0
        );

        set({ items, total: { value: totalValue, currency: 'грн' } });
      },

      setQuantity: (_id, quantity) => {
        if (quantity < 0) quantity = 0;

        const items = get().items.map(i =>
          i._id === _id ? { ...i, quantity } : i
        );

        const totalValue = items.reduce(
          (sum, i) => sum + i.price.value * i.quantity,
          0
        );

        set({ items, total: { value: totalValue, currency: 'грн' } });
      },

      clearCart: () => set({ items: [], total: { value: 0, currency: 'грн' } }),
    }),
    { name: 'clothica-cart-storage' }
  )
);
