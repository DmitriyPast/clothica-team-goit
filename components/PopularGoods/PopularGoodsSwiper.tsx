'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import css from './PopularGoods.module.css';
import { Good } from '@/types/good';
import GoodsList from '../GoodsList/GoodsList';

interface PopularGoodsProps {
  goods: Good[];
}

export default function PopularGoodsSwiper({ goods = [] }: PopularGoodsProps) {
  const swiperRef = useRef<any>(null);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [visibleGoodsCount, setVisibleGoodsCount] = useState(4);
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(goods.length > 4);

  // --- Визначаємо slidesPerView на основі ширини екрану ---
  // const updateSlidesPerView = () => {
  //   const width = window.innerWidth;
  //   if (width >= 1440) setSlidesPerView(4);
  //   else if (width >= 768) setSlidesPerView(2);
  //   else setSlidesPerView(1);
  // };

  // useEffect(() => {
  //   // updateSlidesPerView();
  //   window.addEventListener('resize', updateSlidesPerView);
  //   return () => window.removeEventListener('resize', updateSlidesPerView);
  // }, []);

  // --- Видимі товари ---
  const visibleGoods = useMemo(
    () => goods.slice(0, visibleGoodsCount),
    [goods, visibleGoodsCount]
  );

  // --- Групування товарів під slidesPerView ---
  const groupedGoods = useMemo(() => {
    const groups: Good[][] = [];
    for (let i = 0; i < visibleGoods.length; i += slidesPerView) {
      groups.push(visibleGoods.slice(i, i + slidesPerView));
    }
    return groups;
  }, [visibleGoods, slidesPerView]);

  // --- Оновлення стану кнопок ---
  const updateNavButtons = () => {
    if (!swiperRef.current) return;
    setCanSlidePrev(!swiperRef.current.isBeginning);
    setCanSlideNext(
      !swiperRef.current.isEnd || visibleGoodsCount < goods.length
    );
  };

  useEffect(() => {
    updateNavButtons();
  }, [groupedGoods, visibleGoodsCount]);

  // --- Кнопка "Вперед" ---
  const handleNext = () => {
    if (!swiperRef.current) return;

    // Підвантажуємо ще 3 товари
    setVisibleGoodsCount(prev => Math.min(prev + 3, goods.length));

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
            1440: { slidesPerView: 4 },
          }} // великий десктоп
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 3,
          }}>
          {groupedGoods.map((group, index) => (
            <SwiperSlide key={index}>
              <GoodsList goods={group} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={css.mobileArrows}>
          <button
            className={`${css.navButton} ${css.prevBtn} arrow ${!canSlidePrev ? css.disabled : ''}`}
            onClick={handlePrev}
            disabled={!canSlidePrev}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg">
              <use href="/sprite.svg#arrow_back"></use>
            </svg>
          </button>
          <button
            className={`${css.navButton}  ${css.nextBtn} arrow ${!canSlideNext ? css.disabled : ''}`}
            onClick={handleNext}
            disabled={!canSlideNext || visibleGoodsCount >= goods.length}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <use href="/sprite.svg#arrow_forward"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
