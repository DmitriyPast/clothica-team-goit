'use client';

import type { Size } from '@/types/good';
import { SIZES } from '@/constants/size';

import css from './CategoriesFilter.module.css';

type Props = {
  total: number;
  shown: number;

  category: string;
  size: Size[];

  categories: { _id: string; name: string }[];

  onCategoryChange: (c: string) => void;
  onSizeChange: (s: Size) => void;

  onResetAll: () => void;
  onResetSizes: () => void;
  onResetCategory: () => void;
  onResetPrice: () => void;
};

export default function CategoriesFilter({
  total,
  shown,
  categories,
  category,
  size,

  onCategoryChange,
  onSizeChange,

  onResetAll,
  onResetSizes,
  onResetCategory,
  onResetPrice,
}: Props) {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Фільтри</h2>

      <button className="btn btn-secondary" onClick={onResetAll}>
        Очистити всі
      </button>

      <p className={css.info}>
        Показано <strong>{shown}</strong> з <strong>{total}</strong>
      </p>

      {/* Категорії */}
      <div className={css.block}>
        <div className={css.blockHeader}>
          <h3>Категорії</h3>
          <button onClick={onResetCategory} className={css.resetBtn}>
            Очистити
          </button>
        </div>

        <ul className={css.list}>
          <li>
            <label className={css.option}>
              <input
                type="radio"
                name="category"
                checked={category === 'all'}
                onChange={() => onCategoryChange('all')}
              />
              Усі
            </label>
          </li>

          {categories.map(cat => (
            <li key={cat._id}>
              <label className={css.option}>
                <input
                  type="radio"
                  name="category"
                  checked={category === cat._id}
                  onChange={() => onCategoryChange(cat._id)}
                />
                {cat.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Розмір */}
      <div className={css.block}>
        <div className={css.blockHeader}>
          <h3>Розмір</h3>
          <button onClick={onResetSizes} className={css.resetBtn}>
            Очистити
          </button>
        </div>

        <ul className={css.list}>
          {SIZES.map(s => (
            <li key={s}>
              <label className={css.option}>
                <input
                  type="checkbox"
                  checked={size.includes(s)}
                  onChange={() => onSizeChange(s)}
                />
                {s}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Ціна */}
      <div className={css.block}>
        <div className={css.blockHeader}>
          <h3>Ціна</h3>
          <button onClick={onResetPrice} className={css.resetBtn}>
            Очистити
          </button>
        </div>
      </div>
    </div>
  );
}
