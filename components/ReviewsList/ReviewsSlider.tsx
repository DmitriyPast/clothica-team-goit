"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
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

  // Оновлюємо стан кнопок після свайпу
  const handleSlideChange = () => {
    if (!swiperRef.current) return;
    setCanSlidePrev(!swiperRef.current.isBeginning);
    setCanSlideNext(!swiperRef.current.isEnd);
  };

  useEffect(() => {
    handleSlideChange();
  }, [sortedFeedbacks]);

  return (
    <div className={css.sliderWrapper}>
      <Swiper
        modules={[Navigation, Keyboard]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        spaceBetween={32}
        slidesPerView={1}
        slidesPerGroup={1}
        breakpoints={{
          768: { slidesPerView: 2, slidesPerGroup: 2 },
          1440: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
        keyboard={{ enabled: true }}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
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
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={!canSlidePrev}
        >
          ←
        </button>
        <button
          className={`${css.navButton} next`}
          onClick={() => swiperRef.current?.slideNext()}
          disabled={!canSlideNext}
        >
          →
        </button>
      </div>
    </div>
  );
}
