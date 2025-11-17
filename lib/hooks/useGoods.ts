// ==============================================================================
// ФАЙЛ: lib/hooks/useGoods.ts
// ОПТИМІЗОВАНИЙ ТА СУМІСНИЙ З НОВИМ filterStore
// ==============================================================================

import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import {
  fetchGoods,
  FetchGoodsResponse,
  FetchGoodsParams,
} from '@/lib/api/clientApi';

import { useFilterStore } from '@/lib/store/filterStore';

export const useGoods = () => {
  // Отримуємо метод для підготовки параметрів API
  const getApiParams = useFilterStore(state => state.getApiParams);

  // Спостерігаємо ТІЛЬКИ необхідні поля (мінімум перерендерів)
  const perPage = useFilterStore(state => state.perPage);
  const sortBy = useFilterStore(state => state.sortBy);
  const sortOrder = useFilterStore(state => state.sortOrder);
  const filters = useFilterStore(state => state.filters);

  // СТВОРЮЄМО стабільний queryKey
  const queryKeyParams = useMemo(
    () => ({
      perPage,
      sortBy,
      sortOrder,
      // Глибока копія фільтрів для безпечної реактивності
      filters: {
        category: filters.category,
        gender: filters.gender,
        sizes: [...filters.sizes],
        price: { ...filters.price },
      },
    }),
    [perPage, sortBy, sortOrder, filters]
  );

  return useInfiniteQuery<FetchGoodsResponse>({
    queryKey: ['goods', queryKeyParams],

    queryFn: ({ pageParam = 1 }) => {
      const baseParams = getApiParams();

      const params: FetchGoodsParams = {
        ...baseParams,
        page: Number(pageParam),
      };

      return fetchGoods(params);
    },

    // Стартуємо з першої сторінки
    initialPageParam: 1,

    // Логіка пагінації
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,

    // Зберігає старі дані, поки приходять нові (плавне оновлення)
    placeholderData: previous => previous,
  });
};
