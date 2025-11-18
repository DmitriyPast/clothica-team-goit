// ==============================================================================
// ФАЙЛ: components/Filters/CategoriesFilter.tsx

import { useState, useEffect, useMemo } from 'react';
import styles from './CategoriesFilter.module.css';

// Store + Data hooks
import { useFilterStore } from '@/lib/store/filterStore';
import { useFilterData } from '@/lib/hooks/useFilterData';
import { useGoods } from '@/lib/hooks/useGoods';

import { SIZES } from '@/constants/size';
import { GENDERS } from '@/constants/gender';
import { Size, Gender } from '@/types/good';

const CategoriesFilter = () => {
  // --- Store
  const {
    filters,
    setCategory,
    toggleSize,
    setGender,
    setPrice,
    clearSizes,
    clearGender,
    clearPrice,
    clearAll,
  } = useFilterStore();

  // --- API data
  const { data: filtersData, isLoading: isLoadingCategories } = useFilterData();
  const { data: goodsData } = useGoods();

  // Counters X of Y
  const totalGoodsY = goodsData?.pages[0]?.totalGoods || 0;
  const shownGoodsX = goodsData?.pages.flatMap(p => p.goods).length || 0;

  // Price logic
  const minLimit = 0;
  const maxLimit = 10000;
  const currentMinPrice = filters.price.min ?? minLimit;
  const currentMaxPrice = filters.price.max ?? maxLimit;

  // Mobile controls accordions
  const [isMobile, setIsMobile] = useState(false);
  const [catOpen, setCatOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [genderOpen, setGenderOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  // Detect mobile
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Desktop — all blocks always opened
  useEffect(() => {
    if (!isMobile) {
      setCatOpen(true);
      setSizeOpen(true);
      setGenderOpen(true);
      setPriceOpen(true);
    }
  }, [isMobile]);

  // Category list (with "All")
  const categoryOptions = useMemo(() => {
    const arr = [{ id: 'all', name: 'Усі' }];
    if (filtersData?.categories) {
      filtersData.categories.forEach((cat: any) =>
        arr.push({ id: cat._id, name: cat.name })
      );
    }
    return arr;
  }, [filtersData]);

  return (
    <aside className={styles.container}>
      {/* HEADER */}
      <div className={styles.headerRow}>
        <h3 className={styles.headerTitle}>Фільтри</h3>

        {/* Clear all — always visible */}
        <button
          type="button"
          className={styles.clearAllButton}
          onClick={clearAll}>
          Очистити всі
        </button>
      </div>
      {/* Counters */}
      <p className={styles.caption}>
        Показано {shownGoodsX} з {totalGoodsY}
      </p>
      {/* ============================================================ */}
      {/* CATEGORY */}
      {/* ============================================================ */}
      <section className={styles.section}>
        <button
          type="button"
          className={styles.sectionHeader}
          onClick={() => isMobile && setCatOpen(!catOpen)}>
          <h4 className={styles.sectionTitle}>Категорії</h4>

          {/* Chevron only mobile */}
          <span
            className={`${styles.chevron} ${
              catOpen ? styles.chevronOpen : styles.chevronClosed
            }`}>
            <svg width="20" height="20">
              <use href="/sprite.svg#keyboard_arrow_down" />
            </svg>
          </span>
        </button>

        {catOpen && (
          <div className={styles.accordion}>
            <ul className={styles.list}>
              {isLoadingCategories && <li>Завантаження...</li>}

              {categoryOptions.map(cat => {
                const isActive = filters.category === cat.id;
                return (
                  <li key={cat.id} className={styles.categoryItem}>
                    <button
                      type="button"
                      className={`${styles.categoryButton} ${
                        isActive ? styles.categoryButtonActive : ''
                      }`}
                      onClick={() => setCategory(cat.id)}>
                      {cat.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>
      {/* ============================================================ */}
      {/* SIZE */}
      {/* ============================================================ */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderRow}>
          <button
            type="button"
            className={styles.sectionHeader}
            onClick={() => isMobile && setSizeOpen(!sizeOpen)}>
            <h4 className={styles.sectionTitle}>Розмір</h4>

            <span
              className={`${styles.chevron} ${
                sizeOpen ? styles.chevronOpen : styles.chevronClosed
              }`}>
              <svg width="20" height="20">
                <use href="/sprite.svg#keyboard_arrow_down" />
              </svg>
            </span>
          </button>

          {!isMobile && (
            <button
              type="button"
              className={styles.clearInlineButton}
              onClick={clearSizes}>
              Очистити
            </button>
          )}
        </div>

        {sizeOpen && (
          <div className={styles.accordion}>
            <ul className={styles.list}>
              {SIZES.map(size => {
                const checked = filters.sizes.includes(size as Size);
                return (
                  <li key={size} className={styles.optionRow}>
                    <button
                      type="button"
                      className={`${styles.checkbox} ${
                        checked ? styles.checkboxChecked : ''
                      }`}
                      onClick={() => toggleSize(size as Size)}
                    />
                    <span className={styles.optionLabel}>{size}</span>
                  </li>
                );
              })}
            </ul>

            {isMobile && (
              <button
                type="button"
                className={styles.clearMobileButton}
                onClick={clearSizes}>
                Очистити
              </button>
            )}
          </div>
        )}
      </section>
      {/* ============================================================ */}
      {/* PRICE — DOUBLE RANGE */}
      {/* ============================================================ */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderRow}>
          <button
            type="button"
            className={styles.sectionHeader}
            onClick={() => isMobile && setPriceOpen(!priceOpen)}>
            <h4 className={styles.sectionTitle}>Ціна</h4>

            <span
              className={`${styles.chevron} ${
                priceOpen ? styles.chevronOpen : styles.chevronClosed
              }`}>
              <svg width="20" height="20">
                <use href="/sprite.svg#keyboard_arrow_down" />
              </svg>
            </span>
          </button>

          {!isMobile && (
            <button
              type="button"
              className={styles.clearInlineButton}
              onClick={clearPrice}>
              Очистити
            </button>
          )}
        </div>

        {priceOpen && (
          <>
            {/* DOUBLE RANGE */}
            <div className={styles.doubleSliderWrapper}>
              <div className={styles.track} />

              <div
                className={styles.range}
                style={{
                  left: `${(currentMinPrice / maxLimit) * 100}%`,
                  width: `${((currentMaxPrice - currentMinPrice) / maxLimit) * 100}%`,
                }}
              />

              {/* MIN THUMB */}
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                step={100}
                value={currentMinPrice}
                onChange={e =>
                  setPrice({
                    min: Number(e.target.value),
                    max: currentMaxPrice,
                  })
                }
                className={styles.thumbMin}
              />

              {/* MAX THUMB */}
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                step={100}
                value={currentMaxPrice}
                onChange={e =>
                  setPrice({
                    min: currentMinPrice,
                    max: Number(e.target.value),
                  })
                }
                className={styles.thumbMax}
              />
            </div>

            {/* INPUTS */}
            <div className={styles.priceInputsRow}>
              <div className={styles.priceField}>
                {/* <span className={styles.priceLabel}>Від</span> */}
                <input
                  type="number"
                  min={minLimit}
                  max={maxLimit}
                  value={currentMinPrice}
                  onChange={e =>
                    setPrice({
                      min: Number(e.target.value),
                      max: currentMaxPrice,
                    })
                  }
                  className={styles.priceInput}
                />
              </div>

              <div className={styles.priceField}>
                {/* <span className={styles.priceLabel}>До</span> */}
                <input
                  type="number"
                  min={minLimit}
                  max={maxLimit}
                  value={currentMaxPrice}
                  onChange={e =>
                    setPrice({
                      min: currentMinPrice,
                      max: Number(e.target.value),
                    })
                  }
                  className={`${styles.priceInput} ${styles.priceInputR}`}
                />
              </div>
            </div>

            {isMobile && (
              <button
                type="button"
                className={styles.clearMobileButton}
                onClick={clearPrice}>
                Очистити
              </button>
            )}
          </>
        )}
      </section>

      {/* ============================================================ */}
      {/* GENDER */}
      {/* ============================================================ */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderRow}>
          <button
            type="button"
            className={styles.sectionHeader}
            onClick={() => isMobile && setGenderOpen(!genderOpen)}>
            <h4 className={styles.sectionTitle}>Стать</h4>

            <span
              className={`${styles.chevron} ${
                genderOpen ? styles.chevronOpen : styles.chevronClosed
              }`}>
              <svg width="20" height="20">
                <use href="/sprite.svg#keyboard_arrow_down" />
              </svg>
            </span>
          </button>

          {!isMobile && (
            <button
              type="button"
              className={styles.clearInlineButton}
              onClick={clearGender}>
              Очистити
            </button>
          )}
        </div>

        {genderOpen && (
          <>
            <ul className={styles.list}>
              {GENDERS.map(g => {
                const active = filters.gender === g;
                return (
                  <li key={g} className={styles.optionRow}>
                    <button
                      type="button"
                      className={`${styles.radio} ${
                        active ? styles.radioChecked : ''
                      }`}
                      onClick={() => setGender(g as Gender)}
                    />
                    <span className={styles.optionLabel}>
                      {g === 'women'
                        ? 'Жіночий'
                        : g === 'men'
                          ? 'Чоловічий'
                          : g === 'unisex'
                            ? 'Унісекс'
                            : 'Усі'}
                    </span>
                  </li>
                );
              })}
            </ul>

            {isMobile && (
              <button
                type="button"
                className={styles.clearMobileButton}
                onClick={clearGender}>
                Очистити
              </button>
            )}
          </>
        )}
      </section>
    </aside>
  );
};
export default CategoriesFilter;
