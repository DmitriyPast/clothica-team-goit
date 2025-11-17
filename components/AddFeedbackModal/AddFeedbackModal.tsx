'use client';

import Modal from '@/components/Modal/Modal';
import { Formik, Form, Field } from 'formik';
import { useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './AddFeedbackModal.module.css';
import { createFeedback } from '@/lib/api/clientApi';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Feedback } from '@/types/feedback';

interface ModalProps {
  onClose: () => void;
  id: string;
}

export type NewFeedback = {
  author: string;
  description: string;
  rate: number;
  productId: string;
};

export default function AddFeedbackModal({ onClose, id }: ModalProps) {
  const formId = useId();

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
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
      onClose();
    },
  });

  return createPortal(
    <>
      <div
        className={css.backdrop}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true">
        <div className={css.modal}>
          <Formik
            initialValues={{ author: '', description: '' }}
            onSubmit={values => {
              const payload: NewFeedback = {
                ...values,
                productId: id,
                rate: 5,
              };

              mutation.mutate(payload);
            }}>
            <Form>
              <button
                className={css.closeButton}
                onClick={onClose}
                aria-label="Close modal">
                &times;
              </button>
              <label htmlFor={`${formId}-author`}></label>
              <Field
                as="input"
                name="author"
                id={`${formId}-author`}
                type="text"></Field>
              <label htmlFor={`${formId}-description`}></label>
              <Field
                as="input"
                name="description"
                id={`${formId}-description`}
                type="text"></Field>
              <button type="submit">Надіслати</button>
            </Form>
          </Formik>
        </div>
      </div>
    </>,
    document.body
  );
}
