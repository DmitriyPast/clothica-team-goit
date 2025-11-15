import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';
import '@/app/globals.css';

const Hero: React.FC = () => {
  return (
    <section id={styles.hero}>
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
          <Link
            href="#popular-goods"
            className={`btn btn-primary ${styles.btnGoods}`}>
            До товарів
          </Link>
          <Link
            href="#popular-categories"
            className={`btn btn-secondary ${styles.btnCategs}`}>
            Дослідити категорії
          </Link>
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src="/hero-img/hero.jpg"
          alt="Моделі у базовому одязі Clothica"
          fill
          priority
          className={styles.image}
          sizes="
      (max-width: 767px) 335px,
      (max-width: 1439px) 336px,
      640px
    "
        />
      </div>
    </section>
  );
};

export default Hero;
