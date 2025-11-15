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
        const existing = get().items.find(i => i._id === item._id);
        const items = existing
          ? get().items.map(i =>
              i._id === item._id ? { ...i, quantity: i.quantity + quantity } : i
            )
          : [...get().items, { ...item, quantity }];
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
