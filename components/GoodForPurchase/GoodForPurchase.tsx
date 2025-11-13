import { Formik, Form, Field } from 'formik';
import { useId, useState } from 'react';
import Image from 'next/image';

import css from './GoodForPurchase.module.css';

interface GoodProps {
  image: string;
  name: string;
  price: { value: number };
  prevDescription?: string;
  size: string[];
  description?: string;
  characteristics: string[];
}

export default function GoodForPurchase(props: GoodProps) {
  const [volume, setVolume] = useState(0);
  const fieldId = useId();

  const handleClick = () => {
    setVolume(volume + 1);
  };

  return (
    <div>
      <div className={css.image_wrapper}>
        <Image
          src={props.image}
          alt={props.prevDescription!}
          width={640}
          height={640}
        />
      </div>
      <div className={css.all_info}>
        <div className={css.short_descr_wrapper}>
          <h2 className={css.good_name}>{props.name}</h2>
          <h3 className={css.good_price}>{props.price.value}грн</h3>
          <p className={css.good_prev_descr}>{props.prevDescription}</p>
          <Formik initialValues={{}} onSubmit={() => {}}>
            <Form className={css.form}>
              <div className={css.size_wrapper}>
                <label className={css.size} htmlFor={`${fieldId}-size`}>
                  Розмір
                </label>
                <Field
                  className={css.size_options}
                  as="select"
                  name="size"
                  id={`${fieldId}-size`}
                >
                  {props.size.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Field>
              </div>
              <div className={css.add_to_busket_wrapper}>
                <button
                  className={css.add_to_busket}
                  type="button"
                  onClick={handleClick}
                >
                  Додати в кошик
                </button>
                <Field
                  className={css.volume}
                  as="input"
                  type="number"
                  value={volume}
                  placeholder="0"
                ></Field>
              </div>
              <button className={css.buy_rn} type="submit">
                Купити зараз
              </button>
            </Form>
          </Formik>
        </div>
        <div className={css.full_descr}>
          <h3 className={css.descr_title}>Опис</h3>
          <p className={css.descr}>{props.description}</p>
          <div className={css.characteristics_wrapper}>
            <h3 className={css.characteristics_title}>
              Основні характеристики
            </h3>
            <ul className={css.characteristics_list}>
              {props.characteristics.map(c => (
                <li className={css.characteristic} key={c}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
