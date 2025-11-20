'use client';

import css from './GoodsList.module.css';
import { Good } from '@/types/good';
import GoodInfo from '../GoodInfo/GoodInfo';

type GoodsListProps = {
  goods: Good[];
  type: 'popularGoods' | 'goodsPage';
};

export default function GoodsList({ goods, type }: GoodsListProps) {
  return (
    <ul className={css.goodsList}>
      {goods.map(good => (
        <li key={good._id} className={css.goodsItem}>
          <GoodInfo variant={type} good={good} />
        </li>
      ))}
    </ul>
  );
}
