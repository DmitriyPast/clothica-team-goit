'use client';

import Link from 'next/link';
import css from './GoodInfo.module.css';
import { Good } from '@/types/good';

type Props = { good: Good };

export default function GoodInfo({ good }: Props) {
  return (
    <div>
      <img src={good.image} alt={good.name} className={css.goodImg} />
      <h3>{good.name}</h3>
      {/* <p>Категорія: {good.category?.name}</p> */}
      <div className="stats">
        <svg height={24} width={24}>
          <use href="/sprite.svg#star-filled"></use>
        </svg>
        <span>0</span>
        <svg height={24} width={24}>
          <use href="/sprite.svg#comment"></use>
        </svg>
        <span>0</span>
      </div>
      <p>
        Ціна: {good.price?.value}
        {good.price?.currency} ₴
      </p>
      <Link
        href={`/goods/${good._id}`}
        className={`btn btn-secondary ${css.btnDetails}`}>
        Детальніше
      </Link>
    </div>
  );
}
