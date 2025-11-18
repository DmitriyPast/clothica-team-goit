import { useState } from 'react';
import { useFormikContext } from 'formik';
import css from './SizeSelect.module.css';

export default function SizeSelect({
  name,
  sizes,
}: {
  name: string;
  sizes: string[];
}) {
  const { values, setFieldValue } = useFormikContext<any>(); // Formik контекст
  const [open, setOpen] = useState(false);

  return (
    <div className={css.customSelectWrapper}>
      <label>Розмір</label>
      <div
        className={`${css.customSelect} ${css.customSelectWrapper}`}
        onClick={() => setOpen(!open)}>
        <span>{values[name]}</span> {/* Поточне значення */}
        <span className={css.arrow}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <ul className={css.customOptions}>
          {sizes.map(option => (
            <li
              key={option}
              className={css.option}
              onClick={() => {
                setFieldValue(name, option); // Оновлюємо значення в Formik
                setOpen(false);
              }}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
