'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Category from '@/components/Category/Category';
import { fetchCategories } from '@/lib/api/clientApi';
import css from './CategoriesPage.module.css';

export default function CategoriesPage() {
  const [displayedCategories, setDisplayedCategories] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

  // Завантажуємо ВСІ категорії одразу
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories({ page: 1, perPage: 100 }), // завантажуємо всі
  });

  // ✅ Порядок категорій згідно макету
  const categoryOrder = [
    'футболки та сорочки',
    'худі та світшоти',
    'худі та кофти', // альтернативна назва з бекенду
    'джинси та штани',
    'штани та джинси', // альтернативна назва з бекенду
    'сукні та спідниці',
    'куртки та верхній одяг',
    'верхній одяг', // альтернативна назва з бекенду
    'домашній та спортивний одяг',
    'топи',
    'топи та майки', // альтернативна назва з бекенду
    'інше',
  ];

  // Сортуємо категорії
  const sortCategories = (categories: any[]) => {
    return [...categories].sort((a, b) => {
      const aName = a.name.trim().toLowerCase();
      const bName = b.name.trim().toLowerCase();

      let aIndex = categoryOrder.indexOf(aName);
      let bIndex = categoryOrder.indexOf(bName);

      // Якщо не знайдено - ставимо в кінець
      if (aIndex === -1) aIndex = 999;
      if (bIndex === -1) bIndex = 999;

      return aIndex - bIndex;
    });
  };

  useEffect(() => {
    if (data?.categories) {
      const sorted = sortCategories(data.categories);
      setDisplayedCategories(sorted);
    }
  }, [data]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  // Показуємо тільки перші visibleCount категорій
  const visibleCategories = displayedCategories.slice(0, visibleCount);
  const hasMore = visibleCount < displayedCategories.length;

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
            {isLoading ? (
              <p className={css.loading}>Завантаження...</p>
            ) : (
              <>
                <div className={css.grid}>
                  {visibleCategories.map((category, index) => (
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
                    >
                      Показати більше
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
