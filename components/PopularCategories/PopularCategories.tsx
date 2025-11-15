// PopularCategories.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import css from './PopularCategories.module.css';
import CategoriesList, { Category } from '../CategoriesList/CategoriesList';

// Дані для прикладу
const allCategories: Category[] = [
  { id: 1, name: "Футболки", image: "/fut.jpg" },
  { id: 2, name: "Худі та світшоти", image: "/hudi.jpg" },
  { id: 3, name: "Джинси та штани", image: "/trousers.jpg" },
  { id: 4, name: "Сукні та спідниці", image: "/dress.jpg" },
  { id: 5, name: "Куртки та верхній одяг", image: "/jackets.jpg" },
  { id: 6, name: "Домашній та спортивний одяг", image: "/sport.jpg" },
];

export default function PopularCategories() {
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleNext = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    // Прокручуємо на 3 слайди вперед або до кінця
    const nextIndex = Math.min(swiper.activeIndex + 3, allCategories.length - 1);
    swiper.slideTo(nextIndex);
  };

  const handlePrev = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    // Прокручуємо на 3 слайди назад або до початку
    const prevIndex = Math.max(swiper.activeIndex - 3, 0);
    swiper.slideTo(prevIndex);
  };

  const updateNavButtons = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className={`section ${css.popularCategories}`}>
            <div className={css.popularCategoriesHeader}>
        <h2 className={css.popularCategoriesH}>Популярні категорії</h2>
        <Link href="/categories" className={`btn ${ css.allCategoriesBtn}`}>Всі категорії</Link>
      </div>
      <div className={css.sliderWrapper}>
        <Swiper
            modules={[Navigation, Keyboard]}
            slidesPerView={1}
              spaceBetween={16}
              pagination={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => updateNavButtons(swiper)}
            keyboard={{ enabled: true }}
            breakpoints={{
              375: { slidesPerView: 1 },   // мобільний
              768: { slidesPerView: 2 },   // планшет
              1440: { slidesPerView: 3 },  // великий десктоп
            }}
          >
            {allCategories.map((category) => (
              <SwiperSlide key={category.id}>
                <CategoriesList categories={[category]} />
              </SwiperSlide>
            ))}
          </Swiper>
<div className={css.mobileArrows}>
            <button
          type="button"
          className={`${css.navBtn} ${css.prevBtn}  arrow ${isBeginning ? css.disabled : ''}`}
          onClick={handlePrev}
          disabled={isBeginning}
        >
        <svg width="24" height="24">
              <use href="/sprite.svg#arrow_back"></use>
            </svg>
        </button>
          <button
          type="button"
          className={`${css.navBtn} ${css.nextBtn} arrow ${isEnd ? css.disabled : ''}`}
          onClick={handleNext}
              disabled={isEnd}>
          <svg width="24" height="24">
              <use href="/sprite.svg#arrow_forward"></use>
            </svg>
          </button>
        </div>
            </div>
       
      </section>
  );
}
