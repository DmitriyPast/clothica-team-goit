'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CategoryCard from './CategoryCard';
import css from './PopularCategories.module.css';

export type Category = {
  id: string | number;
  title: string;
  imageUrl: string;
};

const categoriesData: Category[] = [
  { id: 1, title: "Футболки", imageUrl: "/fut.jpg" },
  { id: 2, title: "Худі та світшоти", imageUrl: "/hudi.jpg" },
  { id: 3, title: "Джинси та штани", imageUrl: "/trousers.jpg" },
  { id: 4, title: "Сукні та спідниці", imageUrl: "/dress.jpg" },
  { id: 5, title: "Куртки та верхній одяг", imageUrl: "/jackets.jpg" },
  { id: 6, title: "Домашній та спортивний одяг", imageUrl: "/sport.jpg" },
];

export default function CategoriesList() {
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleNext = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    // Прокручуємо на 3 слайди вперед або до кінця
    const nextIndex = Math.min(swiper.activeIndex + 3, categoriesData.length - 1);
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
    <div className={css.categoriesListWrapper}>
      {/* Стрілки */}
      <button
        type="button"
        className={`${css.navBtn} ${css.prevBtn} ${isBeginning ? css.disabled : ''}`}
        onClick={handlePrev}
        disabled={isBeginning}
      >
        ◀
      </button>

      <button
        type="button"
        className={`${css.navBtn} ${css.nextBtn} ${isEnd ? css.disabled : ''}`}
        onClick={handleNext}
        disabled={isEnd}
      >
        ▶
      </button>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateNavButtons(swiper);
        }}
        onSlideChange={(swiper) => updateNavButtons(swiper)}
        slidesPerView={3}
        spaceBetween={16}
        keyboard={{ enabled: true }}
        breakpoints={{
          375: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1440: { slidesPerView: 3 },
        }}
      >
        {categoriesData.map((cat) => (
          <SwiperSlide key={cat.id}>
            <CategoryCard category={cat} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
