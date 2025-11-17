'use client';

import css from './GoodsList.module.css';
import { Good } from '@/types/good';
import GoodInfo from '../GoodInfo/GoodInfo';

type GoodsListProps = {
  goods: Good[];
};

export default function GoodsList({ goods }: GoodsListProps) {
  if (!goods.length) return null;

  return (
    <ul className={css.goodsList}>
      {goods.map(good => (
        <li key={good._id} className={css.goodItem}>
          <GoodInfo good={good} />
        </li>
      ))}
    </ul>
  );
}
