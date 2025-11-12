import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Good } from '@/types/good';
import { CURRENCIES } from '@/constants/currency';

export type CartItem = Good & { quantity: number };

type CartState = {
  items: CartItem[];
  total: { value: number; currency: (typeof CURRENCIES)[number] };
  addItem: (item: Good, quantity?: number) => void;
  removeItemFromCart: (goodId: string) => void;
  setQuantity: (goodId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: { value: 0, currency: 'грн' },
      addItem: (item, quantity = 1) => {
        const existing = get().items.find(i => i.goodId === item.goodId);
        const items = existing
          ? get().items.map(i =>
              i.goodId === item.goodId
                ? { ...i, quantity: i.quantity + quantity }
                : i
            )
          : [...get().items, { ...item, quantity }];
        const totalValue = items.reduce(
          (sum, i) => sum + i.price.value * i.quantity,
          0
        );
        set({ items, total: { value: totalValue, currency: 'грн' } });
      },
      removeItemFromCart: goodId => {
        const items = get().items.filter(i => i.goodId !== goodId);
        const totalValue = items.reduce(
          (sum, i) => sum + i.price.value * i.quantity,
          0
        );
        set({ items, total: { value: totalValue, currency: 'грн' } });
      },
      setQuantity: (goodId, quantity) => {
        const items = get().items.map(i =>
          i.goodId === goodId ? { ...i, quantity } : i
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
