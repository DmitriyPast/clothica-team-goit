'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './Style.module.css';

export default function Style() {
  const [isRetina, setIsRetina] = useState(false);

  useEffect(() => {
    setIsRetina(window.devicePixelRatio > 1);
  }, []);

  const advantages = [
    {
      id: 1,
      title: 'Якість та натуральність',
      text: 'тільки приємні до тіла тканини, які зберігають форму навіть після десятків прань.',
      img: isRetina ? '/style-img/one@2x.png' : '/style-img/one.png',
      alt: 'Нитка — якість та натуральність',
    },
    {
      id: 2,
      title: 'Універсальний дизайн',
      text: 'базові кольори та лаконічний стиль, що легко комбінуються між собою.',
      img: isRetina ? '/style-img/two@2x.png' : '/style-img/two.png',
      alt: 'Палітра — універсальний дизайн',
    },
    {
      id: 3,
      title: 'Комфорт на кожен день',
      text: 'одяг, який не обмежує рухів і підходить для будь-якої ситуації.',
      img: isRetina ? '/style-img/three@2x.png' : '/style-img/three.png',
      alt: 'Футболка — комфорт на кожен день',
    },
  ];

  return (
    <section className={styles.styleSection} id="style">
      <div className={styles.container}>
        <h2 className={styles.title}>Обери свій унікальний стиль сьогодні</h2>

        <ul className={styles.list}>
          {advantages.map(item => (
            <li key={item.id} className={styles.item}>
              <Image
                src={item.img}
                alt={item.alt}
                width={56}
                height={56}
                className={styles.icon}
              />
              <div>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemText}>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
