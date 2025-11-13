"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import "swiper/css";
import css from "./ReviewsList.module.css";
import { Feedback } from "@/types/feedback";

interface ReviewsSliderProps {
  feedbacks: Feedback[];
  productId?: string;
}

export default function ReviewsSlider({ feedbacks, productId }: ReviewsSliderProps) {
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
        stars.push(<span key={i} className={css.starFilled}>★</span>);
      } else if (i === Math.ceil(rate) && rate % 1 !== 0) {
        stars.push(<span key={i} className={css.starHalf}>★</span>);
      } else {
        stars.push(<span key={i} className={css.starEmpty}>★</span>);
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
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
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
    const prevIndex = Math.max(swiperRef.current.activeIndex - slidesPerView, 0);
    swiperRef.current.slideTo(prevIndex);
  };

  return (
    <div className={css.sliderWrapper}>
      <Swiper
        modules={[Keyboard]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        spaceBetween={32}
        slidesPerView={slidesPerView}
        keyboard={{ enabled: true }}
      >
        {sortedFeedbacks.map((fb) => (
          <SwiperSlide key={fb._id}>
            <div className={css.card}>
              {renderStars(fb.rate)}
              <p className={css.text}>&ldquo;{fb.description}&rdquo;</p>
              <p className={css.author}>{fb.author}</p>
              {!productId && fb.category && (
                <p className={css.category}>{fb.category}</p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={css.navButtons}>
        <button
          className={`${css.navButton} prev`}
          onClick={handlePrev}
          disabled={!canSlidePrev}
        >
          ←
        </button>
        <button
          className={`${css.navButton} next`}
          onClick={handleNext}
          disabled={!canSlideNext}
        >
          →
        </button>
      </div>
    </div>
  );
}
