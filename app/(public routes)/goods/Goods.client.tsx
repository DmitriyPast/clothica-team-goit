'use client';

import { useEffect, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import CategoriesFilter from '@/components/CategoriesFilter/CategoriesFilter';
import GoodsList from '@/components/GoodsList/GoodsList';
import { fetchGoods } from '@/lib/api/clientApi';
import type { FetchGoodsResponse } from '@/lib/api/clientApi';
import { Good, type Size } from '@/types/good';
import css from './GoodsPage.module.css';
import { Gender } from '@/types/good';

function getInitialPerPage() {
  if (typeof window === 'undefined') return 8;
  return window.innerWidth >= 1440 ? 12 : 8;
}

export default function GoodsClient() {
  const [page, setPage] = useState(1);
  const [perPage] = useState(getInitialPerPage);

  const [category, setCategory] = useState('all');
  const [size, setSize] = useState<Size[]>([]);
  // const [gender, setGender] = useState<Gender>("Всі");

  const [allGoods, setAllGoods] = useState<Good[]>([]);
  const [visibleCount, setVisibleCount] = useState(perPage);

  const { data, isLoading, isFetching } = useQuery<FetchGoodsResponse>({
    queryKey: ['goods', { page, perPage, category, size }],
    queryFn: () => fetchGoods({ page, perPage, category, size: size[0] }),
    placeholderData: keepPreviousData,
  });

  const total = data?.totalGoods ?? 0;

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

  useEffect(() => {
    setPage(1);
    setVisibleCount(perPage);
  }, [category, size, perPage]);

  const goodsToShow = allGoods.slice(0, visibleCount);

  const resetFilters = () => {
    setCategory('all');
    setSize([]);
  };

  const loadMore = () => {
    if (isFetching) return;

    const nextVisible = visibleCount + 3;

    const clampedNextVisible = total
      ? Math.min(nextVisible, total)
      : nextVisible;
    setVisibleCount(clampedNextVisible);

    if (clampedNextVisible > allGoods.length && allGoods.length < total) {
      setPage(prev => prev + 1);
    }
  };

  const canLoadMore = visibleCount < total;

  return (
    <div className="container">
      <section>
        <h1 className={css.goodsTitle}>Всі товари</h1>

        <div className={css.goodsPage}>
          <CategoriesFilter
            total={total}
            shown={goodsToShow.length}
            category={category}
            size={size}
            // gender={gender}
            categories={[]}
            onCategoryChange={setCategory}
            onSizeChange={s =>
              setSize(prev =>
                prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
              )
            }
            // onGenderChange={setGender}

            onResetAll={() => {
              setCategory('all');
              setSize([]);
              // setGender("Всі");
            }}
            onResetSizes={() => setSize([])}
            // onResetGender={() => setGender("Всі")}
            onResetCategory={() => setCategory('all')}
            onResetPrice={() => {}}
          />

          {isLoading && <p>Завантаження…</p>}

          {!allGoods.length && !isLoading && (
            <div>
              <p>
                За вашим запитом не знайдено жодних товарів, спробуйте змінити
                фільтри, або скинути їх.
              </p>

              <button className="btn btn-secondary" onClick={resetFilters}>
                Очистити всі
              </button>
            </div>
          )}

          <main className={css.goodsMain}>
            {goodsToShow.length > 0 && <GoodsList goods={goodsToShow} />}

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
      </section>
    </div>
  );
}
