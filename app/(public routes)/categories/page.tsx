'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Category from '@/components/Category/Category';
import { fetchCategories } from '@/lib/api/clientApi';
import css from './CategoriesPage.module.css';

export default function CategoriesPage() {
  const [visibleCount, setVisibleCount] = useState(6); // По замовчуванню для десктопу
  const [isMounted, setIsMounted] = useState(false);

  // ✅ Завантажуємо всі категорії одразу
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories-all'],
    queryFn: () => fetchCategories({ page: 1, perPage: 20 }), // Завантажуємо всі
  });

  // ✅ Функція для сортування категорій
  const sortCategories = (categories: any[]) => {
    const order = [
      'футболки та сорочки',
      'худі та світшоти',
      'худі та кофти',
      'джинси та штани',
      'штани та джинси',
      'сукні та спідниці',
      'куртки та верхній одяг',
      'верхній одяг',
      'домашній та спортивний одяг',
      'топи',
      'топи та майки',
      'інше',
    ];

    return [...categories].sort((a, b) => {
      const aName = a.name.trim().toLowerCase();
      const bName = b.name.trim().toLowerCase();

      let aIndex = order.indexOf(aName);
      let bIndex = order.indexOf(bName);

      if (aIndex === -1) aIndex = 999;
      if (bIndex === -1) bIndex = 999;

      return aIndex - bIndex;
    });
  };

  // ✅ Визначаємо початкову кількість на клієнті
  useEffect(() => {
    setIsMounted(true);
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width >= 1440) {
        setVisibleCount(6); // Desktop
      } else {
        setVisibleCount(4); // Tablet & Mobile
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);

    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const allCategories = data?.categories ? sortCategories(data.categories) : [];
  const displayedCategories = allCategories.slice(0, visibleCount);
  const hasMore = visibleCount < allCategories.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, allCategories.length));
  };

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
                  {displayedCategories.map((category, index) => (
                    <Category
                      key={category._id}
                      category={category}
                      priority={index === 0}
                    />
                  ))}
                </div>

                {isMounted && hasMore && (
                  <div className={css.buttonWrapper}>
                    <button
                      type="button"
                      onClick={loadMore}
                      className={css.button}>
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
