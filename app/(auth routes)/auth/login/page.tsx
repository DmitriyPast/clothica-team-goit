'use client';

import css from './LoginPage.module.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import { loginUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { LoginUser } from '@/types/user';
import { ApiError } from '@/lib/api/api';
import { PHONE_REGEX } from '@/constants/phone_regex';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const schema = Yup.object().shape({
    phone: Yup.string()
      .matches(PHONE_REGEX, 'Невірний формат номеру. Приклад: +380XXXXXXXXX')
      .required('Необхідно ввести номер телефону'),
    password: Yup.string()
      .min(8, 'Мінімум 8 символів')
      .max(128, 'Максимум 128 символів')
      .required('Необхідно ввести пароль'),
  });

  const handleSubmit = async (values: LoginUser) => {
    console.log(values);
    try {
      const res = await loginUser(values);
      if (res) {
        setUser(res);
        router.push('/');
      } else {
        toast.error('Невірний номер телефону або пароль');
      }
    } catch (error) {
      toast.error(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Помилка при вході. Спробуйте ще раз.'
      );
    }
  };

  return (
    <div className="container">
      <div className={css.pageWrapper}>
        <img src="/logo.svg" alt="logo" className={css.logo} />
        <Formik
          initialValues={{ phone: '', password: '' }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={css.formContainer}>
              <div className={css.form}>
                <div className={css.tabs}>
                  <h3 className={css.title}>
                    <Link href="/auth/register">Реєстрація</Link>
                  </h3>
                  <h3 className={`${css.title} ${css.active}`}>Вхід</h3>
                </div>
                <h1 className={css.loginTitle}>Вхід</h1>
                <div className={css.loginData}>
                  <div className={css.loginSepData}>
                    <label className={css.phone}>Номер телефону*</label>
                    <Field
                      name="phone"
                      type="tel"
                      className="input"
                      placeholder="+38 (0__) ___-__-__"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error-text"
                    />
                  </div>
                  <div className={css.loginSepData}>
                    <label>Пароль*</label>
                    <Field
                      name="password"
                      type="password"
                      className="input"
                      placeholder="********"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-text"
                    />
                  </div>
                  <div className={css.loginSepData}>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className={`button btn-primary ${css.button}`}
                    >
                      Увійти
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <footer className={css.footer}>
          © 2025 Clothica. Всі права захищені.
        </footer>
      </div>
    </div>
  );
};

export default LoginForm;
