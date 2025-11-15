import { Formik, Form, Field } from 'formik';
import { useId, useState } from 'react';
import Image from 'next/image';
import Star from './star.svg';
import HalfStar from './halfStar.svg';

import { SIZES } from '@/constants/size';

import css from './GoodForPurchase.module.css';
import { Feedback } from '@/types/feedback';

interface GoodProps {
  image: string;
  name: string;
  price: { value: number };
  prevDescription?: string;
  size: string[];
  description?: string;
  characteristics: string[];
  rate: number;
  feedbacksAmount: number;
}

export default function GoodForPurchase(props: GoodProps) {
  const [volume, setVolume] = useState(0);
  const fieldId = useId();

  const handleClick = () => {
    setVolume(volume + 1);
  };

  function Stars({ value }: { value: number }) {
    const full = Math.floor(value);
    const half = value % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    return (
      <div className={css.stars_wrapper}>
        {Array.from({ length: full }).map((_, i) => (
          <Image
            key={`full-${i}`}
            src={Star}
            alt="star"
            width={16}
            height={16}
          />
        ))}
        {half === 1 && (
          <Image src={HalfStar} alt="half star" width={16} height={16} />
        )}
      </div>
    );
  }

  return (
    <div className={css.full_wrapper}>
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
          <div className={css.price_and_rate_wrapper}>
            <h3 className={css.good_price}>{props.price.value}грн</h3>

            <Stars value={props.rate} />
            <p className={css.feedbacks_amount}>
              ({props.rate}) • {props.feedbacksAmount} відгуків
            </p>
          </div>
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
                  id={`${fieldId}-size`}>
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
                  onClick={handleClick}>
                  Додати в кошик
                </button>
                <Field
                  className={css.volume}
                  as="input"
                  type="number"
                  value={volume}
                  placeholder="0"></Field>
              </div>
              <button className={css.buy_rn} type="submit">
                Купити зараз
              </button>
              <p className={css.free_shipment}>
                Безкоштовна доставка для замовлень від 1000 грн
              </p>
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
