'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './CreateOrderForm.module.css';
import { Order } from '@/types/order';
import { createOrder, updateMe } from '@/lib/api/clientApi';
import { useCartStore } from '@/lib/store/cartStore';
import { useAuthStore } from '@/lib/store/authStore';
import { isAxiosError } from 'axios';

const validationSchema = Yup.object({
  username: Yup.string()
    .min(2, 'Мінімум 2 символи')
    .required('Обовʼязкове поле'),
  userSurname: Yup.string()
    .min(2, 'Мінімум 2 символи')
    .required('Обовʼязкове поле'),
  contactPhone: Yup.string()
    .matches(/^\+?\d{10,15}$/, 'Некоректний номер телефону')
    .required('Обовʼязкове поле'),
  shippingAddress: Yup.string()
    .min(3, 'Мінімум 3 символи')
    .required('Обовʼязкове поле'),
  postNumber: Yup.number()
    .min(1, 'Введіть номер відділення')
    .required('Обовʼязкове поле'),
  comment: Yup.string().max(300, 'Максимум 300 символів'),
});

export default function CreateOrderForm() {
  const { items, total, clearCart } = useCartStore();
  const { user, updateUser } = useAuthStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialValues = {
    username: user?.username || '',
    userSurname: user?.userSurname || '',
    contactPhone: user?.phone || '',
    shippingAddress: user?.city || '',
    postNumber: user?.postNumber || '',
    comment: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Якщо юзер залогінений — оновлюємо його дані в бекенді
      if (user?._id) {
        await updateMe({
          userName: values.username,
          userSurname: values.userSurname,
          phone: values.contactPhone,
          city: values.shippingAddress,
          postNumber: String(values.postNumber),
        });
      }

      // Zustand — оновимо локальний стейт
      updateUser({
        username: values.username,
        userSurname: values.userSurname,
        phone: values.contactPhone,
        city: values.shippingAddress,
        postNumber: values.postNumber,
      });

      const payload: Order = {
        ...(user?._id && { userId: user._id }),
        userName: values.username,
        userSurname: values.userSurname,
        ...(user?.email && { userEmail: user.email }), // якщо є email
        items: items.map(item => ({
          goodId: item._id,
          name: item.name,
          quantity: item.quantity,
          size: item.size,
          gender: item.gender,
          price: item.price,
        })),
        deliveryCost: {
          value: 0, // наприклад, безкоштовна доставка
          currency: 'грн',
        },
        totalPrice: total,
        status: 'Pending',
        shippingAddress: {
          city: values.shippingAddress,
          postNumber: String(values.postNumber),
        },
        contactPhone: values.contactPhone,
        comment: values.comment,
      };

      await createOrder(payload);

      router.push('/goods');
      clearCart();
    } catch (err) {     
      setError('Помилка збереження');
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
            {isSubmitting ? 'Завантаження...' : 'Оформити замовлення'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
