'use client';

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CategoryCard from './CategoryCard';

export type Category = {
  id: string | number;
  title: string;
  imageUrl: string;
};

interface CategoriesListProps {
  categories?: Category[];
}

export default function CategoriesList({ categories = [] }: CategoriesListProps) {
  const [visibleCount, setVisibleCount] = useState(3);
  const swiperRef = useRef<any>(null);

  const loadMore = (count = 3) => {
    setVisibleCount(prev => Math.min(prev + count, categories.length));
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
    loadMore(3);
  };

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const visibleCategories = categories.slice(0, visibleCount);
  const atStart = swiperRef.current ? swiperRef.current.isBeginning : true;
  const atEnd = visibleCount >= categories.length;

  if (!categories.length) return <p>Категорії не знайдені</p>;

  return (
    <div className="categories-list-wrapper">
      <button
        type="button"
        className={`nav-btn prev-btn ${atStart ? 'disabled' : ''}`}
        onClick={handlePrev}
        disabled={atStart}
        aria-label="Попередні категорії"
      >
        ◀
      </button>
      <button
        type="button"
        className={`nav-btn next-btn ${atEnd ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={atEnd}
        aria-label="Наступні категорії"
      >
        ▶
      </button>

      <ul className="categories-ul">
        <Swiper
          onSwiper={swiper => (swiperRef.current = swiper)}
          slidesPerView={3}
          spaceBetween={16}
          keyboard={{ enabled: true }} // без імпорту Keyboard
          breakpoints={{
            375: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1440: { slidesPerView: 3 },
          }}
        >
          {visibleCategories.map(cat => (
            <SwiperSlide key={cat.id}>
              <li>
                <CategoryCard category={cat} />
              </li>
            </SwiperSlide>
          ))}
        </Swiper>
      </ul>
    </div>
  );
}
