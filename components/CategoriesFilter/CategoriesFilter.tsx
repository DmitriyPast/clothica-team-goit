// ==============================================================================
// ФАЙЛ: components/Filters/CategoriesFilter.tsx

import { useState, useEffect, useMemo, useRef } from 'react';
import styles from './CategoriesFilter.module.css';

// Store + Data hooks
import { useFilterStore } from '@/lib/store/filterStore';
import { useFilterData } from '@/lib/hooks/useFilterData';
import { useGoods } from '@/lib/hooks/useGoods';

import { SIZES } from '@/constants/size';
import { GENDERS } from '@/constants/gender';
import { Size, Gender } from '@/types/good';

type SectionKey = 'category' | 'size' | 'price' | 'gender';

const CategoriesFilter = () => {
  // --- Store
  const { filters, setCategory, toggleSize, setGender, setPrice, clearSizes, clearGender, clearPrice, clearAll } = useFilterStore();

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
  const [openedSection, setOpenedSection] = useState<SectionKey | null>(null);
  const categoryAccordionRef = useRef<HTMLDivElement>(null);
  const sizeAccordionRef = useRef<HTMLDivElement>(null);
  const priceAccordionRef = useRef<HTMLDivElement>(null);
  const genderAccordionRef = useRef<HTMLDivElement>(null);
  const [panelHeights, setPanelHeights] = useState<Record<SectionKey, number>>({
    category: 0,
    size: 0,
    price: 0,
    gender: 0,
  });

  // Detect mobile
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Desktop — all blocks always opened
  useEffect(() => {
    setOpenedSection(null);
  }, [isMobile]);

  const isSectionOpen = (section: SectionKey) => !isMobile || openedSection === section;

  const toggleSection = (section: SectionKey) => {
    if (!isMobile) return;
    setOpenedSection(prev => (prev === section ? null : section));
  };

  const getAccordionClass = (section: SectionKey) => {
    const classes = [styles.accordion];
    if (isMobile) {
      classes.push(styles.accordionMobile);
      classes.push(isSectionOpen(section) ? styles.accordionVisible : styles.accordionHidden);
    }
    return classes.join(' ');
  };

  const getAccordionStyle = (section: SectionKey) =>
    isMobile
      ? {
          maxHeight: isSectionOpen(section) ? `${panelHeights[section]}px` : '0px',
        }
      : undefined;

  useEffect(() => {
    const updateHeights = () => {
      setPanelHeights({
        category: categoryAccordionRef.current?.scrollHeight ?? 0,
        size: sizeAccordionRef.current?.scrollHeight ?? 0,
        price: priceAccordionRef.current?.scrollHeight ?? 0,
        gender: genderAccordionRef.current?.scrollHeight ?? 0,
      });
    };

    updateHeights();
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, [filters.category, filters.gender, filters.price.min, filters.price.max, filters.sizes.join(','), filtersData?.categories?.length, isMobile]);

  // Category list (with "All")
  const categoryOptions = useMemo(() => {
    const arr = [{ id: 'all', name: 'Усі' }];
    if (filtersData?.categories) {
      filtersData.categories.forEach((cat: any) => arr.push({ id: cat._id, name: cat.name }));
    }
    return arr;
  }, [filtersData]);

  const hasCategoryFilter = Boolean(filters.category && filters.category !== 'all');
  const hasSizeFilter = filters.sizes.length > 0;
  const hasGenderFilter = Boolean(filters.gender && filters.gender !== 'all');
  const hasPriceFilter = (filters.price.min ?? minLimit) > minLimit || (filters.price.max ?? maxLimit) < maxLimit;

  const renderInlineClear = (section: SectionKey, isActive: boolean, onClear: () => void) => {
    if (!isActive) {
      return null;
    }

    return (
      <button
        type="button"
        className={styles.clearInlineButton}
        onClick={event => {
          event.stopPropagation();
          onClear();
          if (isMobile) {
            setOpenedSection(prev => (prev === section ? null : prev));
          }
        }}>
        Очистити
      </button>
    );
  };

  return (
    <aside className={styles.container}>
      {/* HEADER */}
      <div className={styles.headerRow}>
        <h3 className={styles.headerTitle}>Фільтри</h3>

        {/* Clear all — always visible */}
        <button type="button" className={styles.clearAllButton} onClick={clearAll}>
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
        <div className={styles.sectionHeaderRow}>
          <button
            type="button"
            className={styles.sectionHeader}
            aria-expanded={isSectionOpen('category')}
            aria-controls="categories-filter-panel"
            onClick={() => toggleSection('category')}>
            <h4 className={styles.sectionTitle}>Категорії</h4>

            {/* Chevron only mobile */}
            <span className={`${styles.chevron} ${isSectionOpen('category') ? styles.chevronOpen : styles.chevronClosed}`}>
              <svg width="20" height="20">
                <use href="/sprite.svg#keyboard_arrow_down" />
              </svg>
            </span>
          </button>

          {renderInlineClear('category', hasCategoryFilter, () => setCategory('all'))}
        </div>

        <div
          id="categories-filter-panel"
          ref={categoryAccordionRef}
          className={getAccordionClass('category')}
          style={getAccordionStyle('category')}
          aria-hidden={isMobile && !isSectionOpen('category')}>
          <ul className={styles.list}>
            {isLoadingCategories && <li>Завантаження...</li>}

            {categoryOptions.map(cat => {
              const isActive = filters.category === cat.id;
              return (
                <li key={cat.id} className={styles.categoryItem}>
                  <button
                    type="button"
                    className={`${styles.categoryButton} ${isActive ? styles.categoryButtonActive : ''}`}
                    onClick={() => setCategory(cat.id)}>
                    {cat.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      {/* ============================================================ */}
      {/* SIZE */}
      {/* ============================================================ */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderRow}>
          <button
            type="button"
            className={styles.sectionHeader}
            aria-expanded={isSectionOpen('size')}
            aria-controls="sizes-filter-panel"
            onClick={() => toggleSection('size')}>
            <h4 className={styles.sectionTitle}>Розмір</h4>

            <span className={`${styles.chevron} ${isSectionOpen('size') ? styles.chevronOpen : styles.chevronClosed}`}>
              <svg width="20" height="20">
                <use href="/sprite.svg#keyboard_arrow_down" />
              </svg>
            </span>
          </button>

          {renderInlineClear('size', hasSizeFilter, clearSizes)}
        </div>

        <div
          id="sizes-filter-panel"
          ref={sizeAccordionRef}
          className={getAccordionClass('size')}
          style={getAccordionStyle('size')}
          aria-hidden={isMobile && !isSectionOpen('size')}>
          <ul className={styles.list}>
            {SIZES.map(size => {
              const checked = filters.sizes.includes(size as Size);
              return (
                <li key={size} className={styles.optionRow}>
                  <button type="button" className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ''}`} onClick={() => toggleSize(size as Size)} />
                  <span className={styles.optionLabel}>{size}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      {/* ============================================================ */}
      {/* PRICE — DOUBLE RANGE */}
      {/* ============================================================ */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderRow}>
          <button
            type="button"
            className={styles.sectionHeader}
            aria-expanded={isSectionOpen('price')}
            aria-controls="price-filter-panel"
            onClick={() => toggleSection('price')}>
            <h4 className={styles.sectionTitle}>Ціна</h4>

            <span className={`${styles.chevron} ${isSectionOpen('price') ? styles.chevronOpen : styles.chevronClosed}`}>
              <svg width="20" height="20">
                <use href="/sprite.svg#keyboard_arrow_down" />
              </svg>
            </span>
          </button>

          {renderInlineClear('price', hasPriceFilter, clearPrice)}
        </div>

        <div
          id="price-filter-panel"
          ref={priceAccordionRef}
          className={getAccordionClass('price')}
          style={getAccordionStyle('price')}
          aria-hidden={isMobile && !isSectionOpen('price')}>
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
        </div>
      </section>

      {/* ============================================================ */}
      {/* GENDER */}
      {/* ============================================================ */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderRow}>
          <button
            type="button"
            className={styles.sectionHeader}
            aria-expanded={isSectionOpen('gender')}
            aria-controls="gender-filter-panel"
            onClick={() => toggleSection('gender')}>
            <h4 className={styles.sectionTitle}>Стать</h4>

            <span className={`${styles.chevron} ${isSectionOpen('gender') ? styles.chevronOpen : styles.chevronClosed}`}>
              <svg width="20" height="20">
                <use href="/sprite.svg#keyboard_arrow_down" />
              </svg>
            </span>
          </button>

          {renderInlineClear('gender', hasGenderFilter, clearGender)}
        </div>

        <div
          id="gender-filter-panel"
          ref={genderAccordionRef}
          className={getAccordionClass('gender')}
          style={getAccordionStyle('gender')}
          aria-hidden={isMobile && !isSectionOpen('gender')}>
          <ul className={styles.list}>
            {GENDERS.map(g => {
              const active = filters.gender === g;
              return (
                <li key={g} className={styles.optionRow}>
                  <button type="button" className={`${styles.radio} ${active ? styles.radioChecked : ''}`} onClick={() => setGender(g as Gender)} />
                  <span className={styles.optionLabel}>{g === 'women' ? 'Жіночий' : g === 'men' ? 'Чоловічий' : g === 'unisex' ? 'Унісекс' : 'Усі'}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </aside>
  );
};
export default CategoriesFilter;
