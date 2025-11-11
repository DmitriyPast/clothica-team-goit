'use client';

import css from './RegisterPage.module.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/api/clientApi';
import { ApiError } from '@/lib/api/api';
import { PHONE_REGEX } from '@/constants/phone_regex';
import toast from 'react-hot-toast';
import { RegisterUser } from '@/types/user';

const RegistrationForm = () => {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const schema = Yup.object().shape({
    username: Yup.string()
      .max(32, 'Максимум 32 символи')
      .required('Необхідно ввести імʼя'),
    phone: Yup.string()
      .matches(PHONE_REGEX, 'Невірний формат номеру. Приклад: +380XXXXXXXXX')
      .required('Необхідно ввести номер телефону'),
    password: Yup.string()
      .min(8, 'Мінімум 8 символів')
      .max(128, 'Максимум 128 символів')
      .required('Необхідно ввести пароль'),
  });

  const handleSubmit = async (values: RegisterUser) => {
    console.log(values);
    try {
      const res = await registerUser(values);
      if (res) {
        setUser(res);
        router.push('/');
      } else {
        toast.error('Помилка при реєстрації');
      }
    } catch (error) {
      toast.error(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Не вдалося зареєструватися. Спробуйте пізніше.'
      );
    }
  };

  return (
    <div className="container">
      <div className={css.pageWrapper}>
        <img src="/logo.svg" alt="logo" className={css.logo} />
        <Formik
          initialValues={{ username: '', phone: '', password: '' }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <Form className={css.formContainer}>
            <div className={css.form}>
              <div className={css.tabs}>
                <h3 className={`${css.title} ${css.active}`}>Реєстрація</h3>
                <h3 className={css.title}>
                  <Link href="/auth/login">Вхід</Link>
                </h3>
              </div>
              <h1 className={css.loginTitle}>Реєстрація</h1>
              <div className={css.loginData}>
                <div className={css.loginSepData}>
                  <label>Імʼя*</label>
                  <Field
                    name="username"
                    type="text"
                    className={css.input}
                    placeholder="Ваше ім’я"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error"
                  />
                </div>
                <div className={css.loginSepData}>
                  <label>Номер телефону*</label>
                  <Field
                    name="phone"
                    type="tel"
                    className={css.input}
                    placeholder="+38 (0__) ___-__-__"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                </div>
                <div className={css.loginSepData}>
                  <label>Пароль*</label>
                  <Field
                    name="password"
                    type="password"
                    className={css.input}
                    placeholder="********"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <div className={css.loginSepData}>
                  <button type="submit" className={css.loginButton}>
                    Зареєструватися
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
        <footer className={css.footer}>
          © 2025 Clothica. Всі права захищені.
        </footer>
      </div>
    </div>
  );
};

export default RegistrationForm;
