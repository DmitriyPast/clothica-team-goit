// ==============================================================================
// ФАЙЛ: lib/hooks/useFilterData.ts
// ==============================================================================

import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/lib/api/clientApi';

export const useFilterData = () => {
  return useQuery({
    queryKey: ['categories'],
    // ✅ ВИПРАВЛЕННЯ: Передаємо пустий об'єкт або параметри пагінації,
    // щоб отримати всі категорії (наприклад, 100 штук)
    queryFn: () => fetchCategories({ page: 1, perPage: 100 }),
    staleTime: 1000 * 60 * 5,
  });
};
