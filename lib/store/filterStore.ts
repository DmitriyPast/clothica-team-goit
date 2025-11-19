// // ==============================================================================
// ФАЙЛ: lib/store/filterStore.ts
// ==============================================================================

import { create } from 'zustand';
import { FetchGoodsParams } from '@/lib/api/clientApi';
import { FiltersState, PriceRange } from '@/types/filters';
import { Size, Gender } from '@/types/good';

interface FilterStore {
  filters: FiltersState;

  setCategory: (category: string) => void;
  toggleSize: (size: Size) => void;
  setGender: (gender: Gender) => void;
  setPrice: (price: PriceRange) => void;

  clearSizes: () => void;
  clearGender: () => void;
  clearPrice: () => void;
  clearAll: () => void;

  page: number;
  perPage: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';

  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  setSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void;

  getApiParams: () => FetchGoodsParams;
  getApiUrl: () => string;
}

const initialFilters: FiltersState = {
  category: 'all',
  sizes: [],
  gender: 'all' as Gender,
  price: { min: null, max: null },
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  filters: initialFilters,

  page: 1,
  perPage: 12,
  sortBy: 'price.value',
  sortOrder: 'asc',

  // =========================
  // UI METHODS
  // =========================

  setCategory: category =>
    set(state => ({ filters: { ...state.filters, category }, page: 1 })),

  toggleSize: size =>
    set(state => {
      const sizes = state.filters.sizes.includes(size)
        ? state.filters.sizes.filter(s => s !== size)
        : [size]; // IMPORTANT: backend supports ONE size

      return { filters: { ...state.filters, sizes }, page: 1 };
    }),

  setGender: gender =>
    set(state => ({ filters: { ...state.filters, gender }, page: 1 })),

  setPrice: price =>
    set(state => ({ filters: { ...state.filters, price }, page: 1 })),

  clearSizes: () =>
    set(state => ({ filters: { ...state.filters, sizes: [] }, page: 1 })),

  clearGender: () =>
    set(state => ({ filters: { ...state.filters, gender: 'all' }, page: 1 })),

  clearPrice: () =>
    set(state => ({
      filters: { ...state.filters, price: { min: null, max: null } },
      page: 1,
    })),

  clearAll: () => set(() => ({ filters: initialFilters, page: 1 })),

  // =========================
  // API STATE
  // =========================
  setPage: page => set({ page }),
  setPerPage: perPage => set({ perPage }), //////////////////////////////
  setSort: (sortBy, sortOrder) => set({ sortBy, sortOrder }),

  // =========================
  // API PARAM BUILDER (ВАЖЛИВЕ!)
  // =========================
  getApiParams: () => {
    const state = get();
    const { filters, page, perPage, sortBy, sortOrder } = state;

    const params: FetchGoodsParams = {
      page,
      perPage,
      sortBy,
      sortOrder,
    };

    // category
    if (filters.category !== 'all') {
      params.category = filters.category;
    }

    // gender
    if (filters.gender !== 'all') {
      params.gender = filters.gender;
    }

    // size (backend supports only one size)(welp that sucks)
    if (filters.sizes.length > 0) {
      params.size = filters.sizes[0];
    }

    // PRICE — convert to NUMBERS 💥
    if (filters.price.min !== null) {
      params.minPrice = Number(filters.price.min);
    }

    if (filters.price.max !== null) {
      params.maxPrice = Number(filters.price.max);
    }

    return params;
  },

  // =========================
  // URL BUILDER (ВАЖЛИВЕ!)
  // =========================
  getApiUrl: () => {
    const params = get().getApiParams();

    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

    const url = new URL('/api/goods', base);

    Object.entries(params).forEach(([key, val]) => {
      if (val !== null && val !== undefined) {
        url.searchParams.set(key, String(val));
      }
    });

    return url.toString();
  },
}));
