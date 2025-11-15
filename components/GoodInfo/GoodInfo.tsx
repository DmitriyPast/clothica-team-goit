'use client';

// import css from './GoodInfo.module.css';
import { Good } from '@/types/good';

type Props = { good: Good };

export default function GoodInfo({ good }: Props) {
  return (
    <div >
      <img src={good.image} alt={good.name}  />
      <h3>{good.name}</h3>
      <p>Категорія: {good.category?.name}</p>
      <p>Ціна: {good.price?.value}{good.price?.currency} ₴</p>
      <button>Детальніше</button>
    </div>
  );
}
