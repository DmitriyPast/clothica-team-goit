'use client';

import Image from 'next/image';
import css from './CategoriesList.module.css';
import { Category } from '@/types/category';

// export type Category = {
//   _id: string | number;
//   name: string;
//   image: string;
// };

type CategoriesListProps = {
  categories: Category[];
};

export default function CategoriesList({
  categories = [],
}: CategoriesListProps) {
  return (
    <ul className={`container ${css.categoriesList}`}>
      {categories.map(category => (
        <li key={category._id} className={css.itemCategoriesList}>
          <Image
            src={`/category-img/${category._id}.webp`}
            // src={`/fut.jpg`}
            alt={category.name}
            width={416}
            height={277}
            className={css.image}
          />
          <h3 className={css.titleCategoriesList}>{category.name}</h3>
        </li>
      ))}
    </ul>
  );
}
