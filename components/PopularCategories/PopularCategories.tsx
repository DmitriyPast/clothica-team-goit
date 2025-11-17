// PopularCategories.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import css from './PopularCategories.module.css';
import CategoriesList from '../CategoriesList/CategoriesList';
import { Category } from '@/types/category';
import { fetchCategories } from '@/lib/api/clientApi';

const allCategories: Category[] = (
  await fetchCategories({ page: 1, perPage: 6 })
).categories;

export default function PopularCategories() {
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [slideStep, setSlideStep] = useState(1);

  const updateSlidesPerView = () => {
    const width = window.innerWidth;

    if (width >= 1440) {
      setSlidesPerView(3);
      setSlideStep(3); // ← на десктопі листаємо по 3
    } else if (width >= 768) {
      setSlidesPerView(2);
      setSlideStep(1); // ← планшет по 1
    } else {
      setSlidesPerView(1);
      setSlideStep(1); // ← мобілка по 1
    }
  };
  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const handleNext = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    // Прокручуємо на 3 слайди вперед або до кінця
    const nextIndex = Math.min(
      swiperRef.current.activeIndex + slideStep,
      allCategories.length - slidesPerView
    );

    swiperRef.current.slideTo(nextIndex);
  };

  const handlePrev = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    // Прокручуємо на 3 слайди назад або до початку
    const prevIndex = Math.max(swiperRef.current.activeIndex - slideStep, 0);

    swiperRef.current.slideTo(prevIndex);
  };

  const updateNavButtons = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section
      id="popular-categories"
      className={`section ${css.popularCategories}`}>
      <div className={css.popularCategoriesHeader}>
        <h2 className={css.popularCategoriesH}>Популярні категорії</h2>
        <Link href="/categories" className={`btn ${css.allCategoriesBtn}`}>
          Всі категорії
        </Link>
      </div>
      <div className={css.sliderWrapper}>
        <Swiper
          modules={[Navigation, Keyboard]}
          slidesPerView={1}
          spaceBetween={16}
          pagination={true}
          onSwiper={swiper => (swiperRef.current = swiper)}
          onSlideChange={swiper => updateNavButtons(swiper)}
          keyboard={{ enabled: true }}
          breakpoints={{
            375: { slidesPerView: 1 }, // мобільний
            768: { slidesPerView: 2 }, // планшет
            1440: { slidesPerView: 3 }, // великий десктоп
          }}>
          {allCategories.map(category => (
            <SwiperSlide key={category._id}>
              <CategoriesList categories={[category]} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={css.mobileArrows}>
          <button
            type="button"
            className={`${css.navBtn} ${css.prevBtn}  arrow ${isBeginning ? css.disabled : ''}`}
            onClick={handlePrev}
            disabled={isBeginning}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg">
              <use href="/sprite.svg#arrow_back"></use>
            </svg>
          </button>
          <button
            type="button"
            className={`${css.navBtn} ${css.nextBtn} arrow ${isEnd ? css.disabled : ''}`}
            onClick={handleNext}
            disabled={isEnd}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg">
              <use href="/sprite.svg#arrow_forward"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
