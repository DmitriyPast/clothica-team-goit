'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard } from 'swiper/modules';
import 'swiper/css';
import css from './ReviewsList.module.css';
import { Feedback } from '@/types/feedback';
import Link from 'next/link';

interface ReviewsSliderProps {
  feedbacks: Feedback[];
  productId?: string;
}

export default function ReviewsSlider({
  feedbacks,
  productId,
}: ReviewsSliderProps) {
  const swiperRef = useRef<any>(null);

  const sortedFeedbacks = useMemo(
    () =>
      [...feedbacks].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [feedbacks]
  );

  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(sortedFeedbacks.length > 3);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rate)) {
        stars.push(
          // <span key={i} className={css.starFilled}>
          //   ★
          // </span>
          <svg key={i} width={20} height={20} viewBox="0 0 16 16">
            <use href="/sprite.svg#star-filled"></use>
          </svg>
        );
      } else if (i === Math.ceil(rate) && rate % 1 !== 0) {
        stars.push(
          // <span key={i} className={css.starHalf}>
          //   ★
          // </span>
          <svg key={i} width={20} height={20} viewBox="0 0 16 16">
            <use href="/sprite.svg#star_half"></use>
          </svg>
        );
      } else {
        stars.push(
          // <span key={i} className={css.starEmpty}>
          //   ★
          // </span>
          <svg key={i} width={20} height={20} viewBox="0 0 16 16">
            <use href="/sprite.svg#star"></use>
          </svg>
        );
      }
    }
    return <div className={css.starsWrapper}>{stars}</div>;
  };

  // Обновляємо стан кнопок після свайпу
  const handleSlideChange = () => {
    if (!swiperRef.current) return;
    setCanSlidePrev(!swiperRef.current.isBeginning);
    setCanSlideNext(!swiperRef.current.isEnd);
  };

  // Динамічне визначення slidesPerView при зміні ширини
  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width >= 1440) setSlidesPerView(3);
    else if (width >= 768) setSlidesPerView(2);
    else setSlidesPerView(1);
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  useEffect(() => {
    handleSlideChange();
  }, [sortedFeedbacks, slidesPerView]);

  const handleNext = () => {
    if (!swiperRef.current) return;
    const nextIndex = Math.min(
      swiperRef.current.activeIndex + slidesPerView,
      sortedFeedbacks.length - slidesPerView
    );
    swiperRef.current.slideTo(nextIndex);
  };

  const handlePrev = () => {
    if (!swiperRef.current) return;
    const prevIndex = Math.max(
      swiperRef.current.activeIndex - slidesPerView,
      0
    );
    swiperRef.current.slideTo(prevIndex);
  };

  return (
    <div className={css.sliderWrapper}>
      <Swiper
        modules={[Keyboard]}
        onSwiper={swiper => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        spaceBetween={32}
        slidesPerView={slidesPerView}
        keyboard={{ enabled: true }}>
        {sortedFeedbacks.map(fb => (
          <SwiperSlide key={fb._id}>
            <div className={css.card}>
              {renderStars(fb.rate)}
              <p className={css.text}>&ldquo;{fb.description}&rdquo;</p>
              <p className={css.author}>{fb.author}</p>
              {!productId && (
                <Link
                  href={`/goods/${fb.productId?._id}`}
                  className={css.productName}>
                  {fb.productId?.name}
                </Link>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={css.navButtons}>
        <button
          className={`${css.navButton} prev`}
          onClick={handlePrev}
          disabled={!canSlidePrev}>
          <svg className="arrow" width="24" height="24" viewBox="0 0 16 16">
            <use href="/sprite.svg#arrow_back"></use>
          </svg>
        </button>
        <button
          className={`${css.navButton} next`}
          onClick={handleNext}
          disabled={!canSlideNext}>
          <svg className="arrow" width="24" height="24" viewBox="0 0 16 16">
            <use href="/sprite.svg#arrow_forward"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
