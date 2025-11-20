'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import css from './PopularGoods.module.css';
import { Good } from '@/types/good';
import GoodInfo from '../GoodInfo/GoodInfo';

interface PopularGoodsProps {
  goods: Good[];
}

export default function PopularGoodsSwiper({ goods = [] }: PopularGoodsProps) {
  const swiperRef = useRef<any>(null);
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(goods.length > 4);

  // --- Оновлення стану кнопок ---
  const updateNavButtons = () => {
    if (!swiperRef.current) return;
    setCanSlidePrev(!swiperRef.current.isBeginning);
    setCanSlideNext(!swiperRef.current.isEnd);
  };

  // --- Кнопка "Вперед" ---
  const handleNext = () => {
    if (!swiperRef.current) return;

    // Даємо Swiper трохи часу оновитись
    setTimeout(() => {
      swiperRef.current.slideNext();
    }, 0);
  };

  // --- Кнопка "Назад" ---
  const handlePrev = () => {
    if (!swiperRef.current) return;
    swiperRef.current.slidePrev();
  };

  return (
    <section id="popular-goods" className={css.popularGoods}>
      <div className={css.header}>
        <h2 className={css.popularGoodsTitle}>Популярні товари</h2>
        <Link href="/goods" className={`${css.viewAllButton} btn`}>
          Всі товари
        </Link>
      </div>

      <div className={css.sliderWrapper}>
        <Swiper
          modules={[Keyboard, Pagination]}
          onSwiper={swiper => (swiperRef.current = swiper)}
          onSlideChange={updateNavButtons}
          slidesPerView={1} // показуємо по 1 групі слайдів
          spaceBetween={16}
          keyboard={{ enabled: true }}
          breakpoints={{
            375: { slidesPerView: 1 }, // мобільний
            768: { slidesPerView: 2 }, // планшет
            1440: { slidesPerView: 4 }, // великий десктоп
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 3,
          }}>
          {goods.map((good, index) => (
            <SwiperSlide key={index}>
              <GoodInfo good={good} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={css.mobileArrows}>
          <button
            className={`${css.navButton} ${css.prevBtn} arrow ${!canSlidePrev ? css.disabled : ''}`}
            onClick={handlePrev}
            disabled={!canSlidePrev}>
            <svg width="24" height="24">
              <use href="/sprite.svg#arrow_back"></use>
            </svg>
          </button>
          <button
            className={`${css.navButton}  ${css.nextBtn} arrow ${!canSlideNext ? css.disabled : ''}`}
            onClick={handleNext}
            disabled={!canSlideNext}>
            <svg width="24" height="24">
              <use href="/sprite.svg#arrow_forward"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
