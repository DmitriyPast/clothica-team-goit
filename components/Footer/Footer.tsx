'use client'; // 🔹 Вказує, що компонент рендериться на клієнті (Next.js 13+)

import { addSubscription } from '@/lib/api/clientApi'; // 🔹 Функція для POST-запиту на підписку
import Link from 'next/link'; // 🔹 Компонент для навігації між сторінками Next.js

import css from './Footer.module.css'; // 🔹 Імпорт стилів для компонента Footer
import { Formik, Form, Field } from 'formik'; // 🔹 Компоненти для роботи з формами
import { toast } from 'react-hot-toast'; // 🔹 Бібліотека для показу повідомлень (toast)
import * as Yup from 'yup'; // 🔹 Бібліотека для валідації форм

// 🔹 Схема валідації email-поля у формі
const subscriptionSchema = Yup.object().shape({
  email: Yup.string()
    .email('Невірний формат email') // 🔸 Повідомлення при неправильному форматі
    .required('Email обов’язковий'), // 🔸 Повідомлення при порожньому полі
});

// 🔹 Головний компонент футера
export default function Footer() {
  // 🔹 Обробник сабміту форми підписки
  const handleSubmit = async (
    values: { email: string }, // 🔸 Об'єкт з email, який ввів користувач
    { resetForm }: any // 🔸 Функція для очищення форми після успішної підписки
  ) => {
    if (!values.email) return; // 🔸 Захист: якщо email порожній — нічого не робимо

    try {
      const message = await addSubscription({ email: values.email }); 
      toast.success('Дякуємо! Ви підписані на оновлення.'); 
      resetForm(); // 🔸 Очищення форми після успішного запиту
    } catch (err: any) {
      toast.error(err.message); // 🔸 Показ повідомлення про помилку, якщо запит не вдався
    };
  }


   return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.containerWrap}>
          <div className={css.linksContainer}>
            <Link href="/" aria-label="На головну" className={css.logo}>
              <svg width="84" height="36" aria-hidden="true">
                <use href="/logo.svg"></use>
              </svg>
            </Link>
            <div className={css.footerMenu}>
              <h2 className={css.menu}>Меню</h2>
              <ul className={css.footerList}>
                <li className={css.footerItem}>
                  <Link href="/" className={css.footerLink}>Головна</Link>
                </li>
                <li className={css.footerItem}>
                  <Link href="/products" className={css.footerLink}>Товари</Link>
                </li>
                <li className={css.footerItem}>
                  <Link href="/categories" className={css.footerLink}>Категорії</Link>
                </li>
              </ul>
            </div>
          </div>

           <div className={css.subscribeWrap}>
             <Formik
                initialValues={{ email: '' }}
                validationSchema={subscriptionSchema}
                onSubmit={handleSubmit}
             >
              {({ isSubmitting }) => (
    <Form className={css.inputSubscribe}>
      <h3 className={css.subscribe}>Підписатися</h3>
      <p className={css.text}>
        Приєднуйтесь до нашої розсилки, щоб бути в курсі новин та акцій.
      </p>
      <Field
        className={css.input}
        type="email"
        name="email"
        placeholder="Введіть ваш email"
        required
      />
      <button type="submit" className={css.button} disabled={isSubmitting}>
        {isSubmitting ? "Відправка..." : "Підписатися"}
      </button>
    </Form>
  )}
</Formik>


          </div>
        </div>

        <div className={css.footerSocials}>
          <p className={css.rights}>© 2025 Clothica. Всі права захищені.</p>
          <ul className={css.socialList}>
            <li className={css.socialItem}>
              <Link href="https://www.facebook.com" target="_blank" aria-label="facebook" className={css.socialLinks}>
                <svg className={css.svgIcons} aria-hidden="true"><use href="/sprite.svg#Facebook"></use></svg>
              </Link>
            </li>
            <li className={css.socialItem}>
              <Link href="https://www.instagram.com" target="_blank" aria-label="Instagram" className={css.socialLinks}>
                <svg className={css.svgIcons} aria-hidden="true"><use href="/sprite.svg#Instagram"></use></svg>
              </Link>
            </li>
            <li className={css.socialItem}>
              <Link href="https://x.com" target="_blank" aria-label="x" className={css.socialLinks}>
                <svg className={css.svgIcons} aria-hidden="true"><use href="/sprite.svg#X"></use></svg>
              </Link>
            </li>
            <li className={css.socialItem}>
              <Link href="https://www.youtube.com" target="_blank" aria-label="youtube" className={css.socialLinks}>
                <svg className={css.svgIcons} aria-hidden="true"><use href="/sprite.svg#Youtube"></use></svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}