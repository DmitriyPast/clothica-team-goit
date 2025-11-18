// ==============================================================================
// ФАЙЛ: types/filters.ts
// ==============================================================================

import { Size, Gender } from '@/types/good';

export type PriceRange = {
  min: number | null;
  max: number | null;
};

export type FiltersState = {
  category: string; // 'all' або ID категорії
  sizes: Size[]; // Масив розмірів (Size - це тип з types/good.ts)
  gender: Gender; // 'all', 'women', 'men', 'unisex'
  price: PriceRange;
};
