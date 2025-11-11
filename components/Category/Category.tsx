'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import css from './Category.module.css';

interface CategoryData {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface FetchCategoriesResponse {
  page: number;
  perPage: number;
  totalCategories: number;
  totalPages: number;
  categories: CategoryData[];
}

const CATEGORY_NAMES_MAP: Record<string, string> = {
  tshirts: 'Футболки та сорочки',
  hoodies: 'Худі та світшоти',
  jeans: 'Джинси та штани',
  dresses: 'Сукні та спідниці',
  jackets: 'Куртки та верхній одяг',
  sportswear: 'Домашній та спортивний одяг',
  tops: 'Топи',
  outerwear: 'Верхній одяг',
  other: 'Інше',
};

const fetchCategories = async (
  page: number,
  perPage: number
): Promise<FetchCategoriesResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?page=${page}&perPage=${perPage}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
};

export default function Category() {
  const [page, setPage] = useState(1);
  const perPage = 6;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories', page, perPage],
    queryFn: () => fetchCategories(page, perPage),
  });

  const handleLoadMore = () => {
    if (data && page < data.totalPages) {
      setPage(prev => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <section className={css.section}>
        <div className={css.container}>
          <div className={css.sectionTitle}>
            <h2 className={css.title}>Завантаження...</h2>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className={css.section}>
        <div className={css.container}>
          <div className={css.sectionTitle}>
            <h2 className={css.title}>Помилка завантаження категорій</h2>
          </div>
        </div>
      </section>
    );
  }

  const displayedCategories = data.categories;
  const hasMore = page < data.totalPages;

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.sectionTitle}>
          <h2 className={css.title}>Категорії</h2>
        </div>

        <div className={css.content}>
          <div className={css.grid}>
            {displayedCategories.map(category => {
              const categoryKey = category.name.toLowerCase();
              const ukrainianName =
                CATEGORY_NAMES_MAP[categoryKey] || category.name;

              return (
                <Link
                  href={`/categories/${category._id}`}
                  key={category._id}
                  className={css.card}
                >
                  <div className={css.imageWrapper}>
                    <picture>
                      <source
                        media="(min-width: 1440px)"
                        srcSet={`/${categoryKey}-pc.webp 1x, /${categoryKey}-pc@2x.webp 2x`}
                        type="image/webp"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcSet={`/${categoryKey}-tab.webp 1x, /${categoryKey}-tab@2x.webp 2x`}
                        type="image/webp"
                      />
                      <source
                        media="(min-width: 320px)"
                        srcSet={`/${categoryKey}-mob.webp 1x, /${categoryKey}-mob@2x.webp 2x`}
                        type="image/webp"
                      />
                      <Image
                        src={`/${categoryKey}-mob.webp`}
                        alt={ukrainianName}
                        width={335}
                        height={223}
                        className={css.image}
                        priority={page === 1}
                      />
                    </picture>
                  </div>

                  <div className={css.cardContent}>
                    <h3 className={css.cardTitle}>{ukrainianName}</h3>
                  </div>
                </Link>
              );
            })}
          </div>

          {hasMore && (
            <div className={css.buttonWrapper}>
              <button
                onClick={handleLoadMore}
                className={css.button}
                type="button"
              >
                Показати більше
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
