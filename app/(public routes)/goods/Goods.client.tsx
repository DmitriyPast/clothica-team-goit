'use client';

// React hooks
import { useEffect, useState } from 'react';
// Third-party libraries
import { useQuery, keepPreviousData } from '@tanstack/react-query';
// Components
import CategoriesFilter from '@/components/CategoriesFilter/CategoriesFilter';
import GoodsList from '@/components/GoodsList/GoodsList';
// API functions
import { fetchGoods } from '@/lib/api/clientApi';
import type { FetchGoodsResponse } from '@/lib/api/clientApi';
// State management
import { useFilterStore } from '@/lib/store/filterStore';
// Types
import { Good } from '@/types/good';
// Styles
import css from './GoodsPage.module.css';

// Main component
export default function GoodsClient() {
  // Отримуємо стан фільтрів та методи управління з глобального store
  const {
    filters, // поточні фільтри (категорія, розміри, стать, ціна)
    page, // номер поточної сторінки для пагінації
    perPage, // кількість товарів на сторінку (8 для мобільних, 12 для десктопу)
    getApiParams, // метод для отримання параметрів для API запиту
    clearAll, // метод для скидання всіх фільтрів
    setPage, // метод для зміни номера сторінки
    setPerPage, // метод для зміни кількості товарів на сторінку
  } = useFilterStore();

  // Локальний стан: масив всіх завантажених товарів (накопичується при пагінації)
  const [allGoods, setAllGoods] = useState<Good[]>([]);

  // Локальний стан: кількість товарів, які відображаються на екрані
  const [visibleCount, setVisibleCount] = useState(perPage);

  // Адаптивна логіка: встановлюємо perPage залежно від розміру екрану
  // 8 товарів для мобільних (<1440px), 12 для десктопу (≥1440px)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1440px)');

    const updatePerPage = (e: MediaQueryListEvent | MediaQueryList) => {
      const newPerPage = e.matches ? 12 : 8;
      if (perPage !== newPerPage) {
        setPerPage(newPerPage);
        setVisibleCount(newPerPage);
      }
    };

    // Встановлюю початкове значення при монтуванні компонента
    updatePerPage(mediaQuery);

    // Слухач зміни розміру вікна
    mediaQuery.addEventListener('change', updatePerPage);

    return () => mediaQuery.removeEventListener('change', updatePerPage);
  }, [perPage, setPerPage]);

  // React Query: запит товарів з API з кешуванням та оптимістичними оновленнями
  const { data, isLoading, isFetching } = useQuery<FetchGoodsResponse>({
    queryKey: ['goods', filters, page, perPage], // ключ для кешування
    queryFn: () => fetchGoods(getApiParams()), // функція запиту
    placeholderData: keepPreviousData, // зберігає попередні дані під час завантаження нових
  });

  // Загальна кількість товарів, що відповідають фільтрам
  const total = data?.totalGoods ?? 0;

  // Накопичуємо товари при пагінації: додаємо нові товари до існуючих
  // При page=1 (нові фільтри) - замінюємо всі товари
  // При page>1 (завантаження більше) - додаємо унікальні товари
  useEffect(() => {
    if (!data?.goods) return;

    setAllGoods(prev => {
      if (page === 1) {
        return data.goods;
      }

      const ids = new Set(prev.map(g => g._id));
      const unique = data.goods.filter(g => !ids.has(g._id));
      return [...prev, ...unique];
    });
  }, [data, page]);

  // Скидаємо кількість видимих товарів при зміні будь-якого фільтра
  // Це потрібно, щоб завжди показувати початкову кількість товарів (8 або 12)
  useEffect(() => {
    setVisibleCount(perPage);
  }, [filters.category, filters.sizes, filters.gender, filters.price, perPage]);

  // Масив товарів, які відображаються на екрані (обрізаємо за visibleCount)
  const goodsToShow = allGoods.slice(0, visibleCount);

  // Функція для скидання всіх фільтрів
  const resetFilters = clearAll;

  // Функція "Показати більше": збільшує visibleCount на 3 товари
  // Якщо не вистачає завантажених товарів - запитує наступну сторінку
  const loadMore = () => {
    if (isFetching) return; // блокуємо під час завантаження

    const nextVisible = visibleCount + 3; // додаємо 3 товари

    // Обмежуємо максимальним значенням total
    const clampedNextVisible = total
      ? Math.min(nextVisible, total)
      : nextVisible;
    setVisibleCount(clampedNextVisible);

    // Якщо показуємо більше товарів, ніж завантажено - запитуємо наступну сторінку
    if (clampedNextVisible > allGoods.length && allGoods.length < total) {
      setPage(page + 1);
    }
  };

  // Чи можна завантажити більше товарів (чи є ще товари для відображення)
  const canLoadMore = visibleCount < total;

  return (
    <section>
      <div className="container">
        <h1 className={css.goodsTitle}>Всі товари</h1>

        <div className={css.goodsPage}>
          {/* Компонент фільтрів (категорія, розміри, стать, ціна) */}
          <CategoriesFilter />

          {/* Показуємо індикатор завантаження при першому запиті */}
          {isLoading && <p>Завантаження…</p>}

          {/* Повідомлення про відсутність товарів з кнопкою скидання фільтрів */}
          {!allGoods.length && !isLoading && (
            <div>
              <p>
                За вашим запитом не знайдено жодних товарів, спробуйте змінити
                фільтри, або скинути їх.
              </p>

              <button className="btn btn-secondary" onClick={resetFilters}>
                {' '}
                Очистити всі
              </button>
            </div>
          )}

          <main className={css.goodsMain}>
            {/* Список товарів: відображаємо тільки якщо є товари */}
            {goodsToShow.length > 0 && (
              <GoodsList type="goodsPage" goods={goodsToShow} />
            )}

            {/* Кнопка "Показати більше": показуємо якщо є ще товари для завантаження */}
            {canLoadMore && (
              <button
                onClick={loadMore}
                disabled={isFetching}
                className={`btn btn-primary ${css.loadMoreBtn} ${
                  isFetching ? css.loadMoreBtnDisabled : ''
                }`}>
                {isFetching ? 'Завантаження…' : 'Показати більше'}
              </button>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
