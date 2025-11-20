'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './UserInfoForm.module.css';
import { updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useCartStore } from '@/lib/store/cartStore';
import showToast, { ToastType } from '@/lib/utils/messageService';
import { useEffect, useState } from 'react';

const validationSchema = Yup.object({
  username: Yup.string().min(2, 'Мінімум 2 символи'),
  userSurname: Yup.string().min(2, 'Мінімум 2 символи'),
  contactPhone: Yup.string().matches(
    /^\+?\d{10,15}$/,
    'Некоректний номер телефону'
  ),
  shippingAddress: Yup.string().min(3, 'Мінімум 3 символи'),
  postNumber: Yup.number().min(1, 'Введіть номер відділення'),
});

export default function UserInfoForm() {
  const { user, updateUser } = useAuthStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    username: user?.username || '',
    userSurname: user?.userSurname || '',
    contactPhone: user?.phone || '',
    shippingAddress: user?.city || '',
    postNumber: user?.postNumber || '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  useEffect(() => {
    if (user) {
      setFormValues({
        username: user.username || '',
        userSurname: user.userSurname || '',
        contactPhone: user.phone || '',
        shippingAddress: user.city || '',
        postNumber: user.postNumber || '',
      });
    }
  }, [user]);
  const handleSubmit = async (values: typeof initialValues) => {
    setIsSubmitting(true);

    try {
      await updateMe({
        userName: values.username,
        userSurname: values.userSurname,
        phone: values.contactPhone,
        city: values.shippingAddress,
        postNumber: values.postNumber,
      });

      updateUser({
        username: values.username,
        userSurname: values.userSurname,
        phone: values.contactPhone,
        city: values.shippingAddress,
        postNumber: values.postNumber,
      });

      showToast(ToastType.success, 'Дані успішно оновлено!');
      router.refresh();
    } catch (error) {
      showToast(ToastType.error, 'Помилка при оновленні даних');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form className={css.form}>
          <div className={css.nameContainer}>
            <label>
              Імʼя*
              <Field
                name="username"
                className={`${css.input} ${css.width}`}
                placeholder="Ваше імʼя"
              />
              <ErrorMessage
                name="username"
                component="div"
                className={css.error}
              />
            </label>

            <label>
              Прізвище*
              <Field
                name="userSurname"
                className={`${css.input} ${css.width}`}
                placeholder="Ваше прізвище"
              />
              <ErrorMessage
                name="userSurname"
                component="div"
                className={css.error}
              />
            </label>
          </div>

          <label>
            Номер телефону*
            <Field
              name="contactPhone"
              className={`${css.input} ${css.phone}`}
              placeholder="+38 (0__) ___-__-__"
            />
            <ErrorMessage
              name="contactPhone"
              component="div"
              className={css.error}
            />
          </label>

          <div className={css.addressContainer}>
            <label>
              Місто доставки*
              <Field
                name="shippingAddress"
                className={`${css.input} ${css.width}`}
                placeholder="Ваше місто"
              />
              <ErrorMessage
                name="shippingAddress"
                component="div"
                className={css.error}
              />
            </label>

            <label>
              Номер відділення Нової Пошти*
              <Field
                type="number"
                name="postNumber"
                className={`${css.input} ${css.width}`}
                placeholder="1"
              />
              <ErrorMessage
                name="postNumber"
                component="div"
                className={css.error}
              />
            </label>
          </div>

          <label>
            Коментар
            <Field
              as="textarea"
              name="comment"
              className={`${css.input} ${css.textarea}`}
              placeholder="Введіть ваш коментар"
              style={{ height: '180px' }}
            />
            <ErrorMessage
              name="comment"
              component="div"
              className={css.error}
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn btn-primary ${css.button}`}>
            {isSubmitting ? 'Збереження...' : 'Оновити дані'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
