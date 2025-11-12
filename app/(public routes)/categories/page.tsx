'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Category from '@/components/Category/Category';
import { fetchCategories } from '@/lib/api/clientApi';
import css from './CategoriesPage.module.css';

export default function CategoriesPage() {
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 3;

  const { data, isLoading, error } = useQuery({
    queryKey: ['categories', page],
    queryFn: () => fetchCategories({ page, perPage }),
  });

  useEffect(() => {
    if (data?.categories) {
      setAllCategories(prev => {
        // Додаємо нові категорії, уникаючи дублікатів
        const newCategories = data.categories.filter(
          newCat => !prev.some(cat => cat._id === newCat._id)
        );
        return [...prev, ...newCategories];
      });
    }
  }, [data]);

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
                  {allCategories.map(category => (
                    <Category key={category._id} category={category} />
                  ))}
                </div>

                {hasMore && (
                  <div className={css.buttonWrapper}>
                    <button
                      type="button"
                      onClick={loadMore}
                      className={css.button}
                      disabled={isLoading}
                    >
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
