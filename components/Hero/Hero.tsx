'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';
import { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isRetina, setIsRetina] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(window.innerWidth);
      setIsRetina(window.devicePixelRatio > 1);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const getImage = () => {
    if (windowWidth >= 1440) {
      return {
        src: isRetina
          ? '/hero-img/hero-desktop@2x.jpg'
          : '/hero-img/hero-desktop.jpg',
        width: 640,
        height: 394,
      };
    }
    if (windowWidth >= 768) {
      return {
        src: isRetina ? '/hero-img/hero-tab@2x.jpg' : '/hero-img/hero-tab.jpg',
        width: 336,
        height: 425,
      };
    }
    return {
      src: isRetina ? '/hero-img/hero-mob@2x.jpg' : '/hero-img/hero-mob.jpg',
      width: 335,
      height: 335,
    };
  };

  const image = getImage();

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Знайди свій стиль з Clothica вже сьогодні!
          </h1>

          <p className={styles.text}>
            Clothica — це місце, де комфорт поєднується зі стилем. Ми створюємо
            базовий одяг, який легко комбінується та підходить для будь-якої
            нагоди. Обирай речі, що підкреслять твою індивідуальність і завжди
            будуть актуальними.
          </p>

          <div className={styles.buttons}>
            <Link href="#popular-goods" className={styles.btnPrimary}>
              До товарів
            </Link>
            <Link href="#popular-categories" className={styles.btnSecondary}>
              Дослідити категорії
            </Link>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src={image.src}
            alt="Модель у базовому одязі Clothica"
            width={image.width}
            height={image.height}
            priority
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
