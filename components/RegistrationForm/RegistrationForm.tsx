'use client';

import css from './RegistrationForm.module.css';
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
    <Formik
      initialValues={{ username: '', phone: '', password: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
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
                <Field name="username">
                  {({ field, form }: any) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Ваше ім’я"
                      className={`input ${css.authInput} ${
                        form.touched.username && form.errors.username
                          ? 'input-error'
                          : ''
                      }`}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-text"
                />
              </div>
              <div className={css.loginSepData}>
                <label>Номер телефону*</label>

                <Field name="phone">
                  {({ field, form }: any) => (
                    <input
                      {...field}
                      type="tel"
                      placeholder="+38 (0__) ___-__-__"
                      className={`input ${css.authInput} ${
                        form.touched.username && form.errors.username
                          ? 'input-error'
                          : ''
                      }`}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="error-text"
                />
              </div>
              <div className={css.loginSepData}>
                <label>Пароль*</label>
                <Field name="password">
                  {({ field, form }: any) => (
                    <input
                      {...field}
                      type="password"
                      placeholder="********"
                      className={`input ${css.authInput} ${
                        form.touched.username && form.errors.username
                          ? 'input-error'
                          : ''
                      }`}
                    />
                  )}
                </Field>
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
                  className={`button btn-primary btn ${css.button}`}>
                  Зареєструватися
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
