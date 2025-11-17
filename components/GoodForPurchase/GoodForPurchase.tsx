'use client';

import { Formik, Form, Field } from 'formik';
import { useId, useState } from 'react';
import Image from 'next/image';
import Star from './star.svg';
import HalfStar from './halfStar.svg';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import css from './GoodForPurchase.module.css';

interface GoodProps {
  id: string;
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
  const [volume, setVolume] = useState(1);
  const fieldId = useId();
  const addItem = useCartStore(state => state.addItem);
  const { items } = useCartStore();
  const router = useRouter();

  const quantityById = useCartStore(state =>
    state.items
      .filter(i => i._id === props.id)
      .reduce((sum, i) => sum + i.quantity, 0)
  );

  // ---------- STARS ----------
  function Stars({ value }: { value: number }) {
    const full = Math.floor(value);
    const half = value % 1 >= 0.5 ? 1 : 0;

    return (
      <div className={css.stars_wrapper}>
        {Array.from({ length: full }).map((_, i) => (
          <Image key={i} src={Star} alt="star" width={16} height={16} />
        ))}
        {half === 1 && (
          <Image src={HalfStar} alt="half star" width={16} height={16} />
        )}
      </div>
    );
  }

  // ---------- ADD TO CART ----------
  function handleAdd(size: string) {
    // створюємо новий об'єкт товару для кошика
    addItem(
      {
        _id: props.id,
        name: props.name,
        image: props.image,
        price: props.price.value,
        size,
      },
      volume
    );
  }

  // ---------- BUY NOW ----------
  function handleBuy(size: string) {
    handleAdd(size);
    router.push('/order');
  }

  //---------- VOLUME INPUT HANDLER ----------
  const [localVolume, setLocalVolume] = useState(String(volume));
  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setLocalVolume('');
      return;
    }
    if (!/^\d+$/.test(val)) return;
    const num = Number(val);
    if (num <= 0) {
      setLocalVolume(val);
      return;
    }
    setLocalVolume(val);
    setVolume(num);
  };

  return (
    <div className={css.full_wrapper}>
      {/* IMAGE */}
      <div className={css.image_wrapper}>
        <Image
          src={props.image}
          alt={props.prevDescription || props.name}
          width={640}
          height={640}
        />
      </div>

      {/* INFO */}
      <div className={css.all_info}>
        <div className={css.short_descr_wrapper}>
          <h2 className={css.good_name}>{props.name}</h2>

          <div className={css.price_and_rate_wrapper}>
            <h3 className={css.good_price}>{props.price.value} грн</h3>
            <Stars value={props.rate} />
            <p className={css.feedbacks_amount}>
              ({props.rate}) • {props.feedbacksAmount} відгуків
            </p>
          </div>

          <p className={css.good_prev_descr}>{props.prevDescription}</p>

          {/* FORM */}
          <Formik initialValues={{ size: props.size[0] }} onSubmit={() => {}}>
            {({ values }) => (
              <Form className={css.form}>
                {/* SIZE SELECT */}
                <div className={css.size_wrapper}>
                  <label htmlFor={`${fieldId}-size`}>Розмір</label>
                  <Field as="select" name="size" id={`${fieldId}-size`}>
                    {props.size.map(s => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Field>
                </div>

                {/* ADD TO CART */}
                <div className={css.add_to_busket_wrapper}>
                  <button
                    type="button"
                    className={css.add_to_busket}
                    onClick={() => {
                      console.log(props.id, props.name, values.size, volume);
                      handleAdd(values.size);
                    }}>
                    Додати в кошик
                  </button>

                  <input
                    className={css.volume}
                    type="number"
                    min={1}
                    value={localVolume}
                    onChange={onVolumeChange}
                    onBlur={() => {
                      if (localVolume === '') {
                        setLocalVolume(String(volume));
                      }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAdd(values.size);
                      }
                    }}
                  />
                </div>

                {/* BUY NOW */}
                <button
                  type="button"
                  className={css.buy_rn}
                  onClick={() => handleBuy(values.size)}>
                  Купити зараз
                </button>

                <p className={css.free_shipment}>
                  Безкоштовна доставка для замовлень від 1000 грн
                </p>
              </Form>
            )}
          </Formik>
        </div>

        {/* DESCRIPTION */}
        <div className={css.full_descr}>
          <h3 className={css.descr_title}>Опис</h3>
          <p className={css.descr}>{props.description}</p>

          {/* CHARACTERISTICS */}
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
