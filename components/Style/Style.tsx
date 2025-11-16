import styles from './Style.module.css';
import Image from 'next/image';
import '@/app/globals.css';

export default function Style() {
  const advantages = [
    {
      id: 1,
      icon: '/style-img/one@2x.png',
      title: 'Якість та натуральність',
      text: 'тільки приємні до тіла тканини, які зберігають форму навіть після десятків прань.',
    },
    {
      id: 2,
      icon: '/style-img/two@2x.png',
      title: 'Універсальний дизайн',
      text: 'базові кольори та лаконічний стиль, що легко комбінуються між собою.',
    },
    {
      id: 3,
      icon: '/style-img/three@2x.png',
      title: 'Комфорт на кожен день',
      text: 'одяг, який не обмежує рухів і підходить для будь-якої ситуації.',
    },
  ];

  return (
    <section className={styles.styleSection} id="style">
      <div className={styles.container}>
        <h2 className={styles.title}>Обери свій унікальний стиль сьогодні</h2>

        <ul className={styles.list}>
          {advantages.map(item => (
            <li key={item.id} className={styles.item}>
              <div className={styles.iconWrapper}>
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={56}
                  height={56}
                  className={styles.icon}
                  priority
                />
              </div>

              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemText}>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
