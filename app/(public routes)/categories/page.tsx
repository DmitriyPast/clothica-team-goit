'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Category from '@/components/Category/Category';
import { fetchCategories } from '@/lib/api/clientApi';
import css from './CategoriesPage.module.css';

export default function CategoriesPage() {
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  // Перший запит - 6 категорій, наступні - по 3
  const perPage = page === 1 ? 6 : 3;

  const { data, isLoading, error } = useQuery({
    queryKey: ['categories', page],
    queryFn: () => fetchCategories({ page, perPage }),
  });

  // ✅ Функція для сортування категорій згідно макету
  const sortCategories = (categories: any[]) => {
    const order = [
      'футболки та сорочки',
      'худі та світшоти',
      'худі та кофти', // альтернативна назва
      'джинси та штани',
      'штани та джинси', // альтернативна назва
      'сукні та спідниці',
      'куртки та верхній одяг',
      'верхній одяг', // альтернативна назва
      'домашній та спортивний одяг',
      'топи',
      'топи та майки', // альтернативна назва
      'інше',
    ];

    return [...categories].sort((a, b) => {
      const aName = a.name.trim().toLowerCase();
      const bName = b.name.trim().toLowerCase();

      let aIndex = order.indexOf(aName);
      let bIndex = order.indexOf(bName);

      // Якщо не знайдено в списку - ставимо в кінець
      if (aIndex === -1) aIndex = 999;
      if (bIndex === -1) bIndex = 999;

      return aIndex - bIndex;
    });
  };

  useEffect(() => {
    if (data?.categories) {
      if (page === 1) {
        // Перший запит - замінюємо і сортуємо
        const sorted = sortCategories(data.categories);
        setAllCategories(sorted);
      } else {
        // Наступні запити - додаємо і сортуємо все разом
        setAllCategories(prev => {
          const newCategories = data.categories.filter(
            newCat => !prev.some(cat => cat._id === newCat._id)
          );
          const combined = [...prev, ...newCategories];
          return sortCategories(combined);
        });
      }
    }
  }, [data, page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const hasMore = data && page < data.totalPages;

  if (error) {
    return (
      <section className={css.section}>
        <div className="container">
          <p className={css.error}>Помилка завантаження категорій</p>
        </div>
      </section>
    );
  }

  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.sectionTitle}>
            <h1 className={css.heading}>Категорії</h1>
          </div>

          <div className={css.content}>
            {isLoading && page === 1 ? (
              <p className={css.loading}>Завантаження...</p>
            ) : (
              <>
                <div className={css.grid}>
                  {allCategories.map((category, index) => (
                    <Category
                      key={category._id}
                      category={category}
                      priority={index === 0}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div className={css.buttonWrapper}>
                    <button
                      type="button"
                      onClick={loadMore}
                      className={css.button}
                      disabled={isLoading}>
                      {isLoading ? 'Завантаження...' : 'Показати більше'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
