'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CategoryCard from './CategoryCard';
import css from './PopularCategories.module.css';

export type Category = {
  id: string | number;
  title: string;
  imageUrl: string;
};

// Статичні категорії
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

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <div className={css.categoriesListWrapper}>
      {/* Стрілки */}
      <button
        type="button"
        className={`${css.navBtn} ${css.prevBtn}`}
        onClick={handlePrev}
        aria-label="Попередні категорії"
      >
        ◀
      </button>
      <button
        type="button"
        className={`${css.navBtn} ${css.nextBtn}`}
        onClick={handleNext}
        aria-label="Наступні категорії"
      >
        ▶
      </button>

      {/* Swiper */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
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
