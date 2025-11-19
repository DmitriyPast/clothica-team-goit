'use client';

import Modal from '@/components/Modal/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './AddFeedbackModal.module.css';
import { createFeedback, NewFeedback } from '@/lib/api/clientApi';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Feedback } from '@/types/feedback';
import * as Yup from 'yup';

interface ModalProps {
  onClose: () => void;
  id: string;
}

// export type NewFeedback = {
//   author: string;
//   description: string;
//   rate: number;
//   productId: string;
// };

export default function AddFeedbackModal({ onClose, id }: ModalProps) {
  const formId = useId();

  const FeedbackFormSchema = Yup.object().shape({
    author: Yup.string()
      .min(2, "Ім'я повинно мати мінімум 2 символи")
      .max(30, "Ім'я занадто довге")
      .required("Введіть ім'я"),
    description: Yup.string()
      .min(5, 'Відгук повинен мати мінімум 5 символів')
      .max(300, 'Відгук занадто довгий')
      .required('Введіть відгук'),
    rate: Yup.number()
      .min(1, 'Оцініть продукт')
      .max(5, 'Оцініть продукт')
      .required('Оцініть продукт'),
  });

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: NewFeedback) => createFeedback(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['good'] });
      onClose();
    },
  });

  const StarRatingForm = () => (
    <>
      <Field name="rate">
        {({ field, form }: any) => {
          const value = field.value;

          return (
            <div className={css.starsSelect}>
              {[1, 2, 3, 4, 5].map(num => {
                const isActive = num <= value;

                return (
                  <svg
                    key={num}
                    width="24"
                    height="24"
                    onClick={() => form.setFieldValue('rate', num)}
                    className={css.star}>
                    <use
                      href={`/sprite.svg#${isActive ? 'star-filled' : 'star'}`}
                    />
                  </svg>
                );
              })}
            </div>
          );
        }}
      </Field>
      <ErrorMessage name="rate" component="span" className={css.error} />
    </>
  );

  return createPortal(
    <>
      <div
        className="backdrop"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true">
        <div className={css.modal}>
          <Formik
            validationSchema={FeedbackFormSchema}
            initialValues={{ author: '', description: '', rate: 0 }}
            onSubmit={values => {
              const payload: NewFeedback = {
                ...values,
                productId: { _id: id },
              };

              mutation.mutate(payload);
            }}>
            {({ touched, errors }) => (
              <Form className={css.feedback_form}>
                <button
                  className={css.closeButton}
                  onClick={onClose}
                  aria-label="Close modal">
                  &times;
                </button>
                <h2 className={css.feedback_form_title}>Залишити відгук</h2>
                <div className={css.inputs_wrapper_feedback}>
                  <label htmlFor={`${formId}-author`}>Ваше ім'я</label>
                  <Field
                    as="input"
                    name="author"
                    id={`${formId}-author`}
                    type="text"
                    placeholder="Ваше ім'я"
                    className={`${
                      touched.author
                        ? errors.author
                          ? css.errorBorder
                          : css.validBorder
                        : ''
                    }`}></Field>
                  <ErrorMessage
                    name="author"
                    component="span"
                    className={css.error}
                  />
                </div>
                <div className={css.inputs_wrapper_feedback}>
                  <label htmlFor={`${formId}-description`}>Відгук</label>
                  <Field
                    as="textarea"
                    name="description"
                    id={`${formId}-description`}
                    type="text"
                    placeholder="Відгук"
                    className={`${
                      touched.description
                        ? errors.description
                          ? css.errorBorder
                          : css.validBorder
                        : ''
                    }`}></Field>
                  <ErrorMessage
                    name="description"
                    component="span"
                    className={css.error}
                  />
                </div>
                <StarRatingForm />
                <button type="submit" className={css.submit_feedback}>
                  Надіслати
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>,
    document.body
  );
}
