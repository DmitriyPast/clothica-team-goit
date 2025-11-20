'use client';

import css from './LoginForm.module.css';
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
    try {
      const { user } = await loginUser(values);

      // Успешный логин
      setUser(user);
      router.push('/');
    } catch (error) {
      const err = error as ApiError;

      // ❗️Якщо статус 401, то поверне повідомлення таке:
      if (err.response?.status === 401) {
        toast.error('Невірний номер телефону або пароль');
        return;
      }

      // Якщо є інша помилка від сервера
      const serverError =
        err.response?.data?.error || err.response?.data?.message;

      toast.error(serverError ?? 'Сталася помилка. Спробуйте пізніше.');
    }
  };

  return (
    <>
      {/* <AuthHeader /> */}
      <Formik
        initialValues={{ phone: '', password: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="">
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
                  <Field name="phone">
                    {({ field, form }: any) => (
                      <input
                        {...field}
                        type="tel"
                        placeholder="+38 (0__) ___-__-__"
                        className={`input ${css.authInput} ${
                          form.touched.phone && form.errors.phone
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
                          form.touched.password && form.errors.password
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
                    Увійти
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {/* <AuthFooter /> */}
    </>
  );
};

export default LoginForm;
