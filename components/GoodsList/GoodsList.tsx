'use client';

import css from './GoodsList.module.css';
import { Good } from '@/types/good';
import GoodInfo from '../GoodInfo/GoodInfo';

type supportedtypes = 'popularGoodsHomepage' | 'goodsPage';

type GoodsListProps = {
  goods: Good[];
  type?: supportedtypes;
};

export default function GoodsList({
  goods,
  type = 'popularGoodsHomepage',
}: GoodsListProps) {
  const classes = {
    goodsList: css.goodsList,
    goodsItem: css.goodsItem,
  };
  if (!goods.length) return null;

  switch (type) {
    case 'goodsPage':
      classes.goodsList = css.goodsPageList;
      classes.goodsItem = css.goodsPageItem;
      break;
    default:
      break;
  }

  return (
    <ul className={classes.goodsList}>
      {goods.map(good => (
        <li key={good._id} className={classes.goodsItem}>
          <GoodInfo cssitems="" good={good} />
        </li>
      ))}
    </ul>
  );
}
